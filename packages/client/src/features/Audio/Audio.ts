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
  private requests: Promise<Response | undefined | void>[] = [];
  public isSoundOn = false;

  async add(src: Src, id: Id) {
    if (this.soundsStreams[id]) return;
    if (!this.cache) {
      await this.createCache();
    }
    if (this.cache) {
      try {
        // Получаем исходник из кеша
        let response = await this.matchCache(src);
        // Если его нет, то делаем запрос на его получение и добавляем в кеш
        if (!response) {
          // Пушим его в список реквестов на получение исходников
          this.requests.push(this.cache.add(src));
          await this.allResourcesRequests();
          response = await this.matchCache(src);
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

  private matchCache(src: Src) {
    if (this.cache) {
      const cachePromise =
        this.requests[this.requests.push(this.cache.match(src)) - 1];
      return cachePromise;
    }
  }

  public init() {
    this.createContext();
    if (this.context) {
      this.gainNode = this.context.createGain();
      this.mute();
    }
  }

  // Промис для всех запросов на получение исходников
  private async allResourcesRequests() {
    return Promise.allSettled(this.requests);
  }

  private async decodeAudioData(id: Id) {
    await this.allResourcesRequests();
    if (this.context) {
      if (this.soundsStreams[id] && this.soundsStreams[id].byteLength === 0) {
        console.error(`Error in Audio: empty source audio:${id}`);
        return;
      }
      if (this.buffer[id] || !this.soundsStreams[id]) {
        return;
      }

      try {
        this.buffer[id] = await this.context.decodeAudioData(
          this.soundsStreams[id]
        );
      } catch {
        console.error(`Error in Audio:Failed decode audio:${id}`);
      }
    } else {
      console.error('Error in Audio:Context is not created');
    }
  }

  private createContext() {
    // TODO: Если возникнут ошибки с aудио раскомментировать условие
    // if (!import.meta.env.SSR) {
    if (!this.context) {
      this.context = new AudioContext();
      this.context.suspend();
    }
    // }
  }

  private async createCache() {
    // TODO: Если возникнут ошибки с aудио раскомментировать условие
    // if (!import.meta.env.SSR) {
    this.cache = await caches.open('audio');
    // }
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
    // TODO: Если возникнут ошибки с aудио раскомментировать условие
    // if (!import.meta.env.SSR) {
    if (this.context) {
      await this.allResourcesRequests();
      // Проверяем, есть ли в буфере декодированый исходник
      if (!this.buffer[id]) {
        await this.decodeAudioData(id);
      }

      this.createSource(id);
      // Проверяем, если контекст приостановлен, то будет стартовать только зацикленное аудио(Без проверки при первом включении звука воспроизведутся все аудио которые были запущены пока контекст был приостановлен)
      if (this.context.state !== 'suspended') {
        if (this.audioSourсes[id]) {
          this.audioSourсes[id].start(this.context.currentTime);
          if (options) {
            this.audioSourсes[id].loop = options.loop;
          }
        }
      } else {
        if (options?.loop) {
          this.audioSourсes[id].start(this.context.currentTime);
          this.audioSourсes[id].loop = options.loop;
        }
      }
    }
    // }
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
      if (this.context.state === 'suspended') {
        this.context.resume();
      }
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
