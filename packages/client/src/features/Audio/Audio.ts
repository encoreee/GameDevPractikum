import { AUDIO_IDS } from './const';

type Src = string;
type Id = typeof AUDIO_IDS[keyof typeof AUDIO_IDS] | string;
type SoundsStreams = Record<Id | string, ArrayBuffer>;
type AudioSourses = Record<Id | string, AudioBufferSourceNode>;
type Buffer = Record<Id | string, AudioBuffer>;
interface PlayOptions {
  loop: boolean;
}

class Audio {
  private context?: AudioContext;
  private soundsStreams: SoundsStreams = {};
  private buffer: Buffer = {};
  private gainNode?: GainNode;
  private audioSourses: AudioSourses = {};
  private cache?: Cache;
  private requests: Promise<unknown>[] = [];
  public isSoundOn = false;

  async add(src: Src, id: Id) {
    if (this.soundsStreams[id]) return;
    if (!this.cache) {
      await this.createCache();
    }
    if (this.cache) {
      try {
        let response = await this.cache.match(src);
        if (!response) {
          this.requests.push(this.cache.add(src));
          await this.allResoursesRequests();
        }
        response = await this.cache.match(src);
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
  }

  public init() {
    this.createContext();
    if (this.context) {
      this.gainNode = this.context.createGain();
    }
    this.mute();
  }

  private async allResoursesRequests() {
    await Promise.allSettled(this.requests);
  }

  private async decodeAudioData(id: Id) {
    if (this.context) {
      if (
        this.buffer[id] ||
        !this.soundsStreams[id] ||
        this.soundsStreams[id].byteLength === 0
      )
        return;
      try {
        this.buffer[id] = await this.context.decodeAudioData(
          this.soundsStreams[id]
        );
      } catch {
        console.error(`Failed decode ${id}`);
      }
    } else {
      console.error('Context is not created');
    }
  }

  private createContext() {
    if (!this.context) {
      this.context = new AudioContext();
    }
  }

  private async createCache() {
    this.cache = await caches.open('audio');
  }

  private createSource(id: Id) {
    if (this.context && this.gainNode) {
      this.audioSourses[id] = this.context.createBufferSource();
      this.audioSourses[id].buffer = this.buffer[id];
      this.audioSourses[id].connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
    }
  }

  async play(id: Id, options?: PlayOptions) {
    await this.allResoursesRequests();

    await this.decodeAudioData(id);
    this.createSource(id);
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
