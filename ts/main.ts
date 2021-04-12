/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>
/// <reference path="../node_modules/ts-cookies/index.d.ts"/>
import Scenes from "./scenes";

export var asteroidsPhaserGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: innerHeight ? innerHeight - 1 : undefined || document.documentElement.clientHeight || document.body.clientHeight
  },
  scene: Scenes,
  backgroundColor: '#00000000',
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
};

var asteroidsPhaserGame = new Phaser.Game(asteroidsPhaserGameConfig)

if (location.hostname != '127.0.0.1') console.clear()

console.log('Asteroids se ha iniciado!')
export default asteroidsPhaserGame
