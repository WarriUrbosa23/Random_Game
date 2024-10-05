/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Open Eye", "./Player/costumes/Open Eye.svg", {
        x: 480,
        y: 360,
      }),
      new Costume("Blink", "./Player/costumes/Blink.svg", { x: 480, y: 360 }),
    ];

    this.sounds = [new Sound("pop", "./Player/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "GameOver" },
        this.whenIReceiveGameover
      ),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag2),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Yas next levuhl" },
        this.whenIReceiveYasNextLevuhl
      ),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag4),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag5),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "Flag" }, this.whenIReceiveFlag6),
    ];
  }

  *runcontrols() {
    if (this.keyPressed("right arrow") || this.keyPressed("d")) {
      this.x += this.toNumber(this.stage.vars.runspeed);
      if (this.touching(this.sprites["Platform"].andClones())) {
        this.x += 0 - this.toNumber(this.stage.vars.runspeed);
      }
    }
    if (this.keyPressed("left arrow") || this.keyPressed("a")) {
      this.x += 0 - this.toNumber(this.stage.vars.runspeed);
      if (this.touching(this.sprites["Platform"].andClones())) {
        this.x += this.toNumber(this.stage.vars.runspeed);
      }
    }
  }

  *jumpControl() {
    if (
      this.keyPressed("space") ||
      this.keyPressed("up arrow") ||
      this.keyPressed("w")
    ) {
      this.y -= 1;
      if (this.touching(this.sprites["Platform"].andClones())) {
        this.stage.vars.fallspeed = this.stage.vars.takeoffspeed;
      }
      this.y += 1;
    }
  }

  *fallen() {
    if (this.compare(this.y, -160) < 0) {
      yield* this.broadcastAndWait("GameOver");
    }
  }

  *whenIReceiveGameover() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveFlag() {
    this.stage.vars.takeoffspeed = 16;
    this.stage.vars.runspeed = 5;
    this.stage.vars.gravity = -1;
    this.stage.vars.fallspeed = 0;
    while (true) {
      yield* this.runcontrols();
      yield* this.jumpControl();
      yield* this.simGravity();
      yield;
    }
  }

  *simGravity() {
    this.y += this.toNumber(this.stage.vars.fallspeed);
    if (this.touching(this.sprites["Platform"].andClones())) {
      this.y += 0 - this.toNumber(this.stage.vars.fallspeed);
      this.stage.vars.fallspeed = 0;
    } else {
      this.stage.vars.fallspeed += this.toNumber(this.stage.vars.gravity);
    }
  }

  *whenIReceiveFlag2() {
    this.visible = true;
    this.moveAhead();
    this.goto(-200, 100);
  }

  *whenIReceiveFlag3() {
    yield* this.wait(3);
    while (true) {
      this.costume = "Blink";
      yield* this.wait(0.5);
      this.costume = "Open Eye";
      yield* this.wait(3);
      yield;
    }
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.x === 240) {
        this.stage.vars.level++;
        this.broadcast("Yas next levuhl");
      }
      yield;
    }
  }

  *whenIReceiveYasNextLevuhl() {
    this.goto(-240, 100);
  }

  *whenIReceiveFlag4() {
    while (true) {
      if (this.touching(this.sprites["Spike"].andClones())) {
        this.goto(-200, 100);
      }
      yield;
    }
  }

  *whenIReceiveFlag5() {
    while (true) {
      if (this.compare(this.y, -160) < 0) {
        this.goto(-200, 100);
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.visible = false;
    this.broadcast("Flag");
  }

  *whenIReceiveFlag6() {
    while (true) {
      if (this.compare(this.x, -240) < 0) {
        this.goto(-200, 100);
      }
      yield;
    }
  }
}
