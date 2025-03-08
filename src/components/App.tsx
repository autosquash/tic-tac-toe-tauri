import { useState } from 'react'
import styles from './App.module.css'
import TicTacToe from './TicTacToe'
import ExitModal from './ExitModal'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleExit = () => {
    setIsModalOpen(false)
    setGameStarted(false)
  }

  return (
    <>
      <ExitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleExit}
      />
      {gameStarted ? (
        <TicTacToe exit={() => setIsModalOpen(true)} />
      ) : (
        <div>
          <h2>Juego del 3 en raya</h2>
          <button
            className={styles.baseButton}
            onClick={() => setGameStarted(true)}
          >
            Empezar
          </button>
        </div>
      )}
    </>
  )
}

export default App
