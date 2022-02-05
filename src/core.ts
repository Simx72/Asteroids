import * as Phaser from 'phaser';
import FirstScene from "./scenes/game-scene";
import './functions/audio'

const parent = document.createElement("main");
document.body.appendChild(parent);

export var asteroidsGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: innerHeight ? innerHeight - 1 : undefined || document.documentElement.clientHeight || document.body.clientHeight
  },
  scene: FirstScene,
  backgroundColor: '#00000000',
  transparent: true,
  dom: {
    createContainer: true
  },
  parent,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
};

const ASTEROIDSGAME = new Phaser.Game(asteroidsGameConfig)

