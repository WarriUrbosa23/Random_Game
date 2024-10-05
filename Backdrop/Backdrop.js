/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Backdrop extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Day", "./Backdrop/costumes/Day.svg", {
        x: 241.245205,
        y: 178.465205,
      }),
      new Costume("Sunset", "./Backdrop/costumes/Sunset.svg", {
        x: 240.5131225,
        y: 180.77345877978726,
      }),
      new Costume("Night", "./Backdrop/costumes/Night.svg", {
        x: 242.762765,
        y: 182.09086,
      }),
    ];

    this.sounds = [new Sound("pop", "./Backdrop/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
    ];
  }

  *whenIReceiveFlag() {
    this.moveBehind();
    this.visible = true;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveFlag2() {}

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.toNumber(this.stage.vars.level) === 1) {
        this.costume = "Day";
      }
      if (this.toNumber(this.stage.vars.level) === 4) {
        this.costume = "Sunset";
      }
      if (this.toNumber(this.stage.vars.level) === 5) {
        this.costume = "Night";
      }
      yield;
    }
  }
}
