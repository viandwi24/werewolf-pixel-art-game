import Phaser from 'phaser'
import merge from 'lodash.merge'

declare module 'phaser' {
  interface Game {
    gameClient: GameClient
  }
}

export interface GameClientOptions {
  phaser: Phaser.Types.Core.GameConfig
}

export const DefaultGameClientOptions: GameClientOptions = {
  phaser: {
    type: Phaser.WEBGL,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    render: {
      pixelArt: true,
      antialias: false,
      antialiasGL: false,
    },
    autoFocus: true,
  },
}

export class GameClient {
  options: GameClientOptions
  phaser!: Phaser.Game
  signature: string

  constructor(userOptions: Partial<GameClientOptions>) {
    console.clear()
    this.options = merge(DefaultGameClientOptions, userOptions)
    // console.log('Create GameClient Instance', this.options)
    this.buildPhaser()
    this.signature = Math.random().toFixed(2)
  }

  buildPhaser() {
    // create phaser
    this.phaser = new Phaser.Game(this.options.phaser)

    // disable canvas context menu
    if (this.options.phaser?.canvas)
      this.options.phaser.canvas.addEventListener('contextmenu', (e) =>
        e.preventDefault()
      )

    // register main game engine instance to phaser
    Object.defineProperty(this.phaser, 'gameClient', {
      value: this,
      writable: false,
    })
  }

  destroyAllScenes() {
    this.phaser.scene.getScenes().forEach((scene) => {
      const keep = (scene as any).KEEP_BACKGROUND
      if (keep) return
      scene.scene.stop()
    })
  }

  destroy() {
    this.phaser.events.removeAllListeners()
    this.phaser.destroy(false)
  }

  publicUrl(path: string) {
    return path
  }

  assetUrl(path: string) {
    return this.publicUrl(`assets/${path}`)
  }

  debug(...args: any[]) {
    console.log(`[DEBUG]`, ...args)
  }
}