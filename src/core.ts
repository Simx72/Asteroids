import * as Phaser from 'phaser';
import FirstScene from "./scenes/game-scene";
import './styles.css';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: innerHeight ? innerHeight - 1 : undefined || document.documentElement.clientHeight || document.body.clientHeight
  },
  scene: FirstScene,
  transparent: true,
  dom: {
    createContainer: true,
    behindCanvas: false
  },
  parent: "app",
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
};

const ASTEROIDSGAME = new Phaser.Game(gameConfig)

document.getElementById('loading')?.remove();

export default ASTEROIDSGAME;

