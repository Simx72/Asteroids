import * as Phaser from 'phaser';
import FirstScene from "./scenes/game-scene";
import './functions/audio'
import './styles.css';

const parent = document.createElement("main");
document.body.appendChild(parent);

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: innerHeight ? innerHeight - 1 : undefined || document.documentElement.clientHeight || document.body.clientHeight
  },
  scene: FirstScene,
  backgroundColor: '#00000000',
  transparent: true,
  dom: {
    createContainer: true,
    behindCanvas: false
  },
  parent,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
};

const ASTEROIDSGAME = new Phaser.Game(gameConfig)

export default ASTEROIDSGAME;

