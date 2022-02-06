import Scene from '../../scenes/templates/asteroids-scene';
import cookies from '../../cookies';

export default class AudioManager extends Phaser.GameObjects.GameObject {
  constructor(scene: Scene) {
    super(scene, "manager")

    document.body.appendChild(this.musica)
    this.musica.loop = true

    this.musicVolume = Math.floor(cookies.getNum('config-volumen-musica', true)) / 100
    this.musicVolume = Math.floor(cookies.getNum('config-volumen-fx', true)) / 100

  }

  musica = document.createElement('audio')

  protected currentSong = ""
  private _volume = {
    music: 0,
    fx: 0
  }

  get musicVolume(): number {
    return this._volume.music;
  }
  set musicVolume(val: number) {
    this._volume.music = val;
    this.musica.volume = val;
    cookies.set('config-volumen-musica', val.toString());
  }

  get fxVolume(): number {
    return this._volume.fx;
  }
  set fxVolume(val: number) {
    this._volume.fx;
    cookies.set('config-volumen-fx', val.toString())
  }

  setSong(url: string) {
    if (this.currentSong != url) {
      this.musica.src = url;
      this.currentSong = url;
    }
  }

  stop() {
    this.musica.pause()
  }


}