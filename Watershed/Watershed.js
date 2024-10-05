/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Watershed extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Watershed/costumes/costume1.svg", {
        x: 0,
        y: 0,
      }),
    ];

    this.sounds = [
      new Sound(
        "Giant Rooks - WaterShed",
        "./Watershed/sounds/Giant Rooks - WaterShed.mp3"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag),
    ];
  }

  *whenIReceiveFlag() {
    while (true) {
      yield* this.playSoundUntilDone("Giant Rooks - WaterShed");
      yield;
    }
  }
}
