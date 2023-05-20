type Src = string;
type Id = string;
type SoundsPathsCollection = Record<Id, ArrayBuffer>;
type Buffer = Record<Id, AudioBuffer>;
interface PlayOptions {
  loop: boolean;
}

class Audio {
  private context?: AudioContext;
  private soundsStreams: SoundsPathsCollection = {};
  private buffer: Buffer = {};
  private gainNode?: GainNode;
  private audioSourses: Record<Id, AudioBufferSourceNode> = {};
  private cache?: Cache;
  public isSoundOn = false;

  async add(src: Src, id: Id) {
    if (this.soundsStreams[id]) return;
    if (!this.cache) {
      await this.createCache();
    }
    if (this.cache) {
      try {
        await this.cache.add(src);
        const response = await this.cache.match(src);
        if (response) {
          this.soundsStreams[id] = await response.arrayBuffer();
        } else {
          throw new Error('error on fetch');
        }
      } catch (e) {
        console.error(e);
        throw new Error(e?.toString() || 'Failed on add Audio');
      }
    }
    return this;
  }

  private async decodeAudioData(id: Id) {
    if (this.context) {
      if (this.buffer[id] || !this.soundsStreams[id]) return;
      try {
        this.buffer[id] = await this.context.decodeAudioData(
          this.soundsStreams[id]
        );
      } catch {
        console.error(`failed decode ${id}`);
      }
    }
  }

  private createContext() {
    if (!this.context) {
      this.context = new AudioContext();
      this.context.suspend();
    }
  }

  private async createCache() {
    this.cache = await caches.open('audio');
  }

  private createSourse(id: Id) {
    if (this.context) {
      if (!this.gainNode) {
        this.gainNode = this.context.createGain();
        this.mute();
      }
      this.audioSourses[id] = this.context.createBufferSource();
      this.audioSourses[id].buffer = this.buffer[id];
      this.audioSourses[id].connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
    }
  }

  async play(id: Id, options?: PlayOptions) {
    this.createContext();
    await this.decodeAudioData(id);
    this.createSourse(id);
    if (this.context && this.audioSourses[id]) {
      this.audioSourses[id].start(this.context.currentTime);
      if (options) {
        this.audioSourses[id].loop = true;
      }
    }
  }

  stop(id: Id) {
    if (this.audioSourses[id]) {
      this.audioSourses[id].disconnect();
    }
  }

  stopAll() {
    Object.values(this.audioSourses).forEach((audioSource) => {
      audioSource.disconnect();
    });
  }

  soundOn() {
    if (this.context?.state === 'suspended') {
      this.context.resume();
    }
    if (this.gainNode && this.context) {
      this.isSoundOn = true;
      this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
    }
  }

  mute() {
    if (this.gainNode && this.context) {
      this.isSoundOn = false;
      this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    }
  }
}

export default new Audio();
