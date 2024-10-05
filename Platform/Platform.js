/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Platform extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Level 1", "./Platform/costumes/Level 1.svg", {
        x: 360,
        y: 270,
      }),
      new Costume("Level 2", "./Platform/costumes/Level 2.svg", {
        x: 350.76287983354,
        y: 181.32132000000001,
      }),
      new Costume("Level 3", "./Platform/costumes/Level 3.svg", {
        x: 360,
        y: 270,
      }),
      new Costume("Level 4", "./Platform/costumes/Level 4.svg", {
        x: 360,
        y: 270,
      }),
      new Costume("Level 5", "./Platform/costumes/Level 5.svg", {
        x: 242.75748627764784,
        y: 164.81181991340233,
      }),
      new Costume("End!", "./Platform/costumes/End!.svg", {
        x: 240.96826000000004,
        y: 162.13426479880707,
      }),
    ];

    this.sounds = [new Sound("pop", "./Platform/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
    ];
  }

  *whenIReceiveFlag() {
    this.visible = true;
    this.stage.vars.level = 1;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.toNumber(this.stage.vars.level) === 1) {
        this.costume = "Level 1";
      }
      if (this.toNumber(this.stage.vars.level) === 2) {
        this.costume = "Level 2";
      }
      if (this.toNumber(this.stage.vars.level) === 3) {
        this.costume = "Level 3";
      }
      if (this.toNumber(this.stage.vars.level) === 4) {
        this.costume = "Level 4";
      }
      if (this.toNumber(this.stage.vars.level) === 5) {
        this.costume = "Level 5";
      }
      if (this.toNumber(this.stage.vars.level) === 6) {
        this.costume = "End!";
      }
      yield;
    }
  }
}
