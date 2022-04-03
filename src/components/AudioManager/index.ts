import Scene from '../../scenes/default';
import cookies from '../../cookies';

const musicaNode = document.createElement('audio')
document.getElementById('app')?.appendChild(musicaNode);

class AudioManager extends Phaser.Events.EventEmitter {
  constructor(scene: Scene) {
    super();

    this.scene = scene;
    this.musica.loop = true

    this.musicVolume = Math.floor(cookies.getNum('config-volumen-musica', true)) / 100
    this.fxVolume = Math.floor(cookies.getNum('config-volumen-fx', true)) / 100

  }

  scene: Scene;

  musica = musicaNode;

  protected currentSong = ""
  private _volume = {
    music: 0,
    fx: 0
  }

  get musicVolume(): number {
    return this._volume.music;
  }
  set musicVolume(val: number) {
    if (0 <= val && val <= 100) {
      this._volume.music = val;
      this.musica.volume = val;
      cookies.set('config-volumen-musica', val.toString());
    } else throw new Error("val param must be a number between 0 and 100")
  }

  get fxVolume(): number {
    return this._volume.fx;
  }
  set fxVolume(val: number) {
    if (0 <= val && val <= 100) {
      this._volume.fx = val;
      cookies.set('config-volumen-fx', val.toString())
    }
  }

  setSong(url: string) {
    if (this.currentSong != url) {
      this.musica.src = url;
      this.currentSong = url;
    }
  }

  pause(): this {
    this.musica.pause();
    return this;
  }

  syncResume(): this {
    this.musica.play();
    this.emit(AudioManager.Events.Music.RESUME);
    return this;
  }
  
  async resume() {
    await this.musica.play();
    this.emit(AudioManager.Events.Music.RESUME);
  }


}

namespace AudioManager {
  export namespace Events {
    export namespace Music {
      export const PAUSE = 'musicpause';
      export const RESUME = 'musicresume';
    }
  }
}

export default AudioManager;