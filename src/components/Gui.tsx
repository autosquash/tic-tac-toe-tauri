import styles from './Gui.module.css'
import appStyles from './App.module.css'

interface GuiProps {
  status: string
  resetGame: () => void
  exit: () => void
}

export default function Gui({ status, resetGame, exit }: Readonly<GuiProps>) {
  return (
    <div className={styles.gui}>
      <div className={styles.frame}>
        <p className={styles.status}>{status}</p>
        <div className={styles.buttonContainer}>
          <button className={appStyles.baseButton} onClick={resetGame}>
            Reiniciar
          </button>
          <span className={styles.sep} />
          <button className={appStyles.baseButton} onClick={exit}>
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}
