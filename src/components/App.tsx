import { useRef, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import './App.css'

type Player = 'X' | 'O' | ''

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [board, setBoard] = useState<string[]>(Array(9).fill(''))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [gameOver, setGameOver] = useState(false)
  const [status, setStatus] = useState('Turno del jugador X')

  // Check game state with the backend
  const checkGameState = async (currentBoard: readonly string[]) => {
    try {
      const result = await invoke<string>('check_game_state', {
        board: currentBoard,
      })

      if (result === 'X' || result === 'O') {
        setStatus(`¡Ganó el jugador ${result}!`)
        setGameOver(true)
      } else if (result === 'draw') {
        setStatus('¡Empate!')
        setGameOver(true)
      } else {
        const newPlayer = currentPlayer === 'X' ? 'O' : 'X'
        setCurrentPlayer(newPlayer)
        setStatus(`Turno del jugador ${newPlayer}`)
      }
    } catch (error) {
      console.error('Error al verificar el estado:', error)
    }
  }

  const handleCellClick = async (index: number) => {
    if (gameOver || board[index] !== '') {
      return
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0.15
      audioRef.current.play()
    }
    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    await checkGameState(newBoard)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(''))
    setCurrentPlayer('X')
    setGameOver(false)
    setStatus('Turno del jugador X')
  }

  // Render individual cell
  const renderCell = (index: number) => (
    <button
      key={index}
      className="cell"
      onClick={() => handleCellClick(index)}
      disabled={gameOver || board[index] !== ''}
    >
      {board[index]}
    </button>
  )

  return (
    <div className="game">
      <h1>Tres en raya</h1>
      <div className="flex">
        <div className="gui">
          <div className="frame">
            <p className="status">{status}</p>
            <div>
              <button className="reset-button" onClick={resetGame}>
                Reiniciar
              </button>
              <audio ref={audioRef} src="/public/tap.mp3" />
            </div>
          </div>
        </div>
        <div className="board">
          {board.map((_, index) => renderCell(index))}
        </div>
      </div>
    </div>
  )
}

export default App
