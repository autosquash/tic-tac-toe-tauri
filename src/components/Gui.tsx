import './Gui.css'

interface GuiProps {
  status: string
  resetGame: () => void
  exit: () => void
}

export default function Gui({ status, resetGame, exit }: Readonly<GuiProps>) {
  return (
    <div className="gui">
      <div className="frame">
        <p className="status">{status}</p>
        <div className="flex">
          <button className="base-button" onClick={resetGame}>
            Reiniciar
          </button>
          <span className="sep" />
          <button className="base-button" onClick={exit}>
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}
