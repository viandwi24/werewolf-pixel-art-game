import React, { useEffect, useRef } from 'react'
import { GameClient } from '../../games/game'
import { PreloadScene } from '../../games/scenes/preload-scene'
import './Game.scss'

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let game: GameClient
  
  useEffect(() => {
    if (canvasRef.current) {
      if (game) game.destroy()
      const canvas = canvasRef.current
      const parent = canvas.parentElement as HTMLElement
      const g = new GameClient({
        phaser: {
          parent,
          canvas,
          scale: {
            mode: Phaser.Scale.RESIZE,
            width: parent.clientWidth || 0,
            height: parent.clientHeight || 0,
          },
          autoFocus: true,
          scene: [PreloadScene],
        },
      })
      game = g
    }
    return () => {
      if (game) game.destroy()
    }
  }, [canvasRef.current])

  return (
    <div className="screen-container">
      <div className="screen-canvas-container">
        <canvas ref={canvasRef} className="screen-canvas" />
      </div>
    </div>
  )
}