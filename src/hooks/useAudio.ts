import { useRef } from 'react'

export default function useAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)

  function tryTap() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0.15
      audioRef.current.play()
    }
  }
  return { tryTap, audioRef }
}
