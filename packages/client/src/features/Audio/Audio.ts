import { AUDIO_IDS } from './const';

type Src = string;
type Id = typeof AUDIO_IDS[keyof typeof AUDIO_IDS] | string;
type SoundsStreams = Record<Id, ArrayBuffer>;
type AudioSourсes = Record<Id, AudioBufferSourceNode>;
type Buffer = Record<Id | string, AudioBuffer>;
interface PlayOptions {
  loop: boolean;
}

class Audio {
  private context?: AudioContext;
  private soundsStreams: SoundsStreams = {};
  private buffer: Buffer = {};
  private gainNode?: GainNode;
  private audioSourсes: AudioSourсes = {};
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
        // Проверяем есть ли аудио исходник в кэше
        let response = await this.cache.match(src);
        // Если его нет, то получаем и добавляем в кеш
        if (!response) {
          this.requests.push(this.cache.add(src));
          await this.allResourcesRequests();
          response = await this.cache.match(src);
        }
        if (response) {
          this.soundsStreams[id] = await response.arrayBuffer();
        } else {
          throw new Error('Error in Audio: Error on fetch');
        }
      } catch (e) {
        console.error(e);
        throw new Error(e?.toString() || 'Error in Audio:Failed on add Audio');
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

  private async allResourcesRequests() {
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
        console.error(`Error in Audio:Failed decode ${id}`);
      }
    } else {
      console.error('Error in Audio:Context is not created');
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
      this.audioSourсes[id] = this.context.createBufferSource();
      this.audioSourсes[id].buffer = this.buffer[id];
      this.audioSourсes[id].connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
    }
  }

  async play(id: Id, options?: PlayOptions) {
    await this.allResourcesRequests();

    await this.decodeAudioData(id);
    this.createSource(id);
    if (this.context && this.audioSourсes[id]) {
      this.audioSourсes[id].start(this.context.currentTime);
      if (options) {
        this.audioSourсes[id].loop = options.loop;
      }
    }
  }

  stop(id: Id) {
    if (this.audioSourсes[id]) {
      this.audioSourсes[id].disconnect();
    }
  }

  stopAll() {
    Object.values(this.audioSourсes).forEach((audioSource) => {
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
