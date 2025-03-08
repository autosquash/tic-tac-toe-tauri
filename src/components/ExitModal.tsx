import styles from './ExitModal.module.css'

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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>¿Salir del juego?</h2>
        <p>
          Por favor, confirma si quieres salir del juego. La partida actual se
          descartará.
        </p>
        <div className={styles.modalButtons}>
          <button
            className={`${styles.btn} ${styles.cancel}`}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`${styles.btn} ${styles.confirm}`}
            onClick={onConfirm}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExitModal
