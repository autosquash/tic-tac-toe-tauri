import './ExitModal.css'

interface ExitModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ExitModal = ({
  isOpen,
  onClose,
  onConfirm,
}: Readonly<ExitModalProps>) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>¿Salir del juego?</h2>
        <p>
          Por favor, confirma si quieres salir del juego. La partida actual se
          descartará.
        </p>
        <div className="modal-buttons">
          <button className="btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn confirm" onClick={onConfirm}>
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExitModal
