import React from 'react'
import ReactDOM from 'react-dom/client'

export function GameScreenUI(props: {
  children: React.ReactNode,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        display: "flex"
      }}
      className="font-game"
    >
      {props.children}
    </div>
  )
}

export interface ReactUi {
  render: () => void
  destroy: () => void
}

export function createReactUi(scene: Phaser.Scene, element: JSX.Element) {
  const containerDOM = document.createElement('div') as HTMLElement
  containerDOM.id = `react-ui-container-${scene.scene.key}`
  document.body.appendChild(containerDOM)
  const root = ReactDOM.createRoot(containerDOM)
  const destroy = () => {
    root.unmount()
    containerDOM.remove()
  }
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, destroy)
  scene.game.events.once(Phaser.Core.Events.DESTROY, destroy)
  return {
    render: () => {
      root.render(element)
    },
    destroy
  }
}

export function GameButtonUi({
  children,
  text,
  onClick
}: {
  children?: React.ReactNode,
  text?: string,
  onClick?: () => void
}) {
  return (
    <button
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children || text}
    </button>
  )
}
