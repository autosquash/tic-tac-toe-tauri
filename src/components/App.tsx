import { useState } from 'react'
import './App.css'
import TicTacToe from './TicTacToe'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  return gameStarted ? (
    <TicTacToe />
  ) : (
    <div>
      <button className="base-button" onClick={() => setGameStarted(true)}>
        Empezar
      </button>
    </div>
  )
}

export default App
