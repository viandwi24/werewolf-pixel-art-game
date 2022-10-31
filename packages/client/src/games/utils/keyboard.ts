import Phaser from "phaser"
import EventEmitter from "events"

export class KeyboardController {
  currKeydowns: string[] = []

  events: EventEmitter = new EventEmitter()

  constructor(public scene: Phaser.Scene) {
    scene.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      (event: KeyboardEvent) => {
        if (this.currKeydowns.indexOf(event.key) === -1) {
          this.currKeydowns.push(event.key)
          this.events.emit('keydown', event)
        }
      }
    )
    scene.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      (event: KeyboardEvent) => {
        this.currKeydowns.splice(this.currKeydowns.indexOf(event.key), 1)
        this.events.emit('keyup', event)
      }
    )
    scene.events.on(Phaser.Scenes.Events.UPDATE, this.update.bind(this))
  }

  update() {}

  destroy() {
    this.events.removeAllListeners()
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update.bind(this))
  }
}
