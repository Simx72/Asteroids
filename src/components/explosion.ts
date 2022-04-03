import Scene from '../scenes/default';
import asset_explosion from '../assets/images/PNG/exp2_0.png';
import asset_explosionaudio from '../assets/sounds/explosion.wav';


function explosion(scene: Scene, x: number, y: number) {
  return new Promise<Phaser.GameObjects.Sprite>((resolve, reject) => {
    if (scene.data.values['explosion.preload']) {
      let exp = scene.add.sprite(x, y, 'explosion').setVisible(false)

      exp.anims.create({
        key: 'explotar',
        frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
        frameRate: 40,
        repeat: 0
      })

      let audio = scene.sound.add('audio.explo')
      audio.once('complete', () => {
        audio.destroy()
      })
      audio.play('', {
        volume: scene.audio.fxVolume
      })

    
      exp
        .setPosition(x, y)
        .setVisible(true)
        .once('animationcomplete', () => {
          resolve(exp)
          exp.destroy()
        })
        .anims.play('explotar')
      
    } else {
      let err = new Error('You need to add explosion.preload to the scene preload function')
      reject(err);
    }
  })
}

namespace explosion {
  export function preload(scene: Scene) {
    try {
      scene.load.audio('audio.explo', asset_explosionaudio)
      scene.load.spritesheet({
        key: 'explosion',
        url: asset_explosion,
        frameConfig: {
          frameWidth: 64,
          startFrame: 0,
          endFrame: 15,
          frameHeight: 64
        }
      })
    } catch (e) {
      console.error('Ocurrio un error al cargar explosion.preload');
      throw e;
    } finally {
      scene.data.set('explosion.preload', true);
    }
  }
}

export default explosion;