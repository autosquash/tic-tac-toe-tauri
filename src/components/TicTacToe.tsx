import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import styles from './TicTacToe.module.css'
import useAudio from '../hooks/useAudio'
import Gui from './Gui'
import appStyles from './App.module.css'

type Player = 'X' | 'O' | ''

interface Props {
  exit: () => void
}

function TicTacToe({ exit }: Props) {
  const { audioRef, tryTap } = useAudio()

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
    tryTap()
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
      className={styles.cell}
      onClick={() => handleCellClick(index)}
      disabled={gameOver || board[index] !== ''}
    >
      {board[index]}
    </button>
  )

  return (
    <div className={styles.game}>
      <audio ref={audioRef} src="/tap.mp3" preload="auto" />
      <h1>Tres en raya</h1>
      <div className={appStyles.flex}>
        <Gui status={status} resetGame={resetGame} exit={exit} />
        <div className={styles.board}>
          {board.map((_, index) => renderCell(index))}
        </div>
      </div>
    </div>
  )
}

export default TicTacToe
