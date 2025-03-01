import './Gui.css'

interface GuiProps {
  status: string
  resetGame: () => void
}

export default function Gui({ status, resetGame }: Readonly<GuiProps>) {
  return (
    <div className="gui">
      <div className="frame">
        <p className="status">{status}</p>
        <div>
          <button className="reset-button" onClick={resetGame}>
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}
