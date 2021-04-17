/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>
import Scenes from "./scenes";
import { crearMenu } from './functions/cargar-menu';
import './functions/audio'

let debug = false

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
    arcade: { debug }
  },
};

export function iniciar() {

  crearMenu()

  let asteroidsPhaserGame = new Phaser.Game(asteroidsPhaserGameConfig)

  console.log('Asteroids se ha iniciado!')

  return asteroidsPhaserGame

}

