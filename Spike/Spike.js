/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Spike extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "MSE official Spike",
        "./Spike/costumes/MSE official Spike.svg",
        { x: 200, y: 150 }
      ),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag2),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveFlag() {
    this.moveAhead();
  }

  *whenIReceiveFlag2() {
    while (true) {
      if (this.toNumber(this.stage.vars.level) === 1) {
        this.visible = false;
      }
      if (this.toNumber(this.stage.vars.level) === 2) {
        this.visible = true;
        this.goto(43, 76);
      }
      if (this.toNumber(this.stage.vars.level) === 3) {
        this.goto(120, -50);
      }
      if (this.toNumber(this.stage.vars.level) === 4) {
        this.visible = false;
      }
      yield;
    }
  }
}
