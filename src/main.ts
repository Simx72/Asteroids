import * as Phaser from 'phaser';
import FirstScene from "./scenes/game-scene";
import { crearMenu } from './functions/cargar-menu';
import './functions/audio'

let debug = false

export var asteroidsGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: innerHeight ? innerHeight - 1 : undefined || document.documentElement.clientHeight || document.body.clientHeight
  },
  scene: FirstScene,
  backgroundColor: '#00000000',
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: { debug }
  },
};

crearMenu()

const ASTEROIDSGAME = new Phaser.Game(asteroidsGameConfig)

