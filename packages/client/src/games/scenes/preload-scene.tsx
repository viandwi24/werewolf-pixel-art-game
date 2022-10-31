import Phaser from 'phaser'
import { Tilemap } from '../map/tilemap'
import { KeyboardController } from '../utils/keyboard'
import { createReactUi } from '../utils/ui'

export function PreloadSceneUI(props: { scene: PreloadScene }) {
  return (
    <div className="fixed top-0 right-0 text-xs rounded-lg px-4 py-2 text-gray-100 bg-slate-800">
      PHASER + REACT UI + MONOREPO + NAKAMA
    </div>
  )
}

export class PreloadScene extends Phaser.Scene {
  KEEP_BACKGROUND = true
  map!: Tilemap

  // player
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  player_direction: string = 'ArrowDown'
  player_move: boolean = false

  constructor() {
    super({ key: 'PreloadScene' })
  }

  init() {
    // before scene preload

    // call main instance "GameClient"
    this.game.gameClient.debug('[SCENE:main] init')
  }

  preload() {
    // for loading assets

    // load chars
    const charUrl = this.game.gameClient.assetUrl('chars/femalestaffdark_yellow.png')
    this.load.spritesheet('char', charUrl, { frameWidth: 32, frameHeight: 32 })

    // preload and init map
    const mapUrl = this.game.gameClient.assetUrl('maps/1.json')
    this.map = new Tilemap(this, 'tilemap_base', mapUrl)

    // debug
    this.game.gameClient.debug('[SCENE:main] preload')

    // create react ui
    createReactUi(
      this,
      <PreloadSceneUI scene={this} />
    ).render()
  }

  create() {
    // before scene start, creating obj dll

    // debug
    this.game.gameClient.debug('[SCENE:main] create')

    // create player
    const player = this.physics.add.sprite(100, 200, 'char')
    this.player = player
    player.setDisplaySize(16, 16)
    player.setOrigin(0)
    player.setDepth(5)
    // player.anims.create({
    //   key: 'idle',
    //   frames: this.anims.generateFrameNumbers('char', {
    //     start: 0,
    //     end: 10,
    //   }),
    //   frameRate: 14,
    //   repeat: -1,
    // })

    // cameras
    this.cameras.main.setZoom(4)
    this.cameras.main.startFollow(player, true)

    // controls
    const keyboardController = new KeyboardController(this)
    keyboardController.events.addListener(
      'keydown',
      this.onKeyboardKeyDown.bind(this)
    )
    keyboardController.events.addListener(
      'keyup',
      this.onKeyboardKeyUp.bind(this)
    )
  }

  update(time: number, delta: number): void {
    // on every frame update
    // this.game.gameClient.debug('[SCENE:main] update')

    // handle player move
    const control = this.updateControl()
    const speed = 85
    const diagMove = control.axisX !== 0 && control.axisY !== 0
    const diagSpeed = speed - speed / 4
    const velX = control.axisX * (diagMove ? diagSpeed : speed)
    const velY = control.axisY * (diagMove ? diagSpeed : speed)
    this.player.setVelocity(velX, velY)
  }

  updateControl() {
    let axisX = 0
    let axisY = 0
    let direction = this.player_direction

    // dont move if player is not moving
    if (!this.player_move) {
      return {
        isMove: false,
        axisX,
        axisY,
        direction,
      }
    }

    // getting axis
    switch (this.player_direction) {
      case 'up':
        axisY = -1
        break
      case 'down':
        axisY = 1
        break
      case 'left':
        axisX = -1
        break
      case 'right':
        axisX = 1
        break
    }

    return {
      isMove: true,
      axisX,
      axisY,
      direction,
    }
  }

  onKeyboardKeyDown(event: KeyboardEvent) {
    const moves_keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (moves_keys.includes(event.key)) {
      this.player_direction = event.key.replaceAll('Arrow', '').toLocaleLowerCase()
      this.player_move = true
    }
  }

  onKeyboardKeyUp(event: KeyboardEvent) {
    const moves_keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (moves_keys.includes(event.key)) {
      this.player_move = false
    }
  }
}
