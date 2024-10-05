/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("All", "./Stage/costumes/All.svg", { x: 0, y: 0 }),
    ];

    this.sounds = [];

    this.triggers = [];

    this.vars.runspeed = 5;
    this.vars.fallspeed = -1;
    this.vars.gravity = -1;
    this.vars.takeoffspeed = 16;
    this.vars.level = 8;
  }
}
