import { useState } from 'react'
import './App.css'
import TicTacToe from './TicTacToe'
import ExitModal from './ExitModal'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log({ isModalOpen })

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
          <button className="base-button" onClick={() => setGameStarted(true)}>
            Empezar
          </button>
        </div>
      )}
    </>
  )
}

export default App
