/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class NewGame1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("New Game", "./NewGame1/costumes/New Game.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.effects.ghost = 100;
  }
}
