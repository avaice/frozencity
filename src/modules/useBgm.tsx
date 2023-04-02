import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const BGM_SRC = {
  opening: "opening.mp3",
  greenworld: "greenworld.mp3",
  shibuya: "shibuya.mp3",
  msrr: "msrr.mp3",
  cheezecake: "cheezecake.mp3",
  huyuice: "huyuice.mp3",
  obasan: "obasan.mp3",
  gesuido: "gesuido.mp3",
}

export type BGMType = keyof typeof BGM_SRC
export const useBgm = () => {
  const [currentBgm, setBgm] = useState<BGMType | undefined>()
  const [loadStatus, setLoadStatus] = useState<number[]>([
    0,
    Object.keys(BGM_SRC).length,
  ])
  const [isInitializedBgm, InitializeBgm] = useState<boolean | "NOBGM">(false)
  const audio = useRef(new Map<BGMType, HTMLAudioElement>())

  const enableBgmEvent = useCallback(() => {
    ;(Object.keys(BGM_SRC) as BGMType[]).forEach((v) => {
      const newAudio = new Audio()
      newAudio.src = `${process.env.PUBLIC_URL}/sounds/${BGM_SRC[v]}`
      newAudio.loop = true
      newAudio.volume = 0
      newAudio.onloadeddata = () => {
        setLoadStatus((prev) => [prev[0] + 1, prev[1]])
      }
      newAudio.play()
      newAudio.pause()
      audio.current.set(v, newAudio)
    })
  }, [])

  useEffect(() => {
    const b = currentBgm ? audio.current.get(currentBgm) : undefined
    if (b) {
      b.currentTime = 0
    }

    // iOSはゴミだからボリューム調整ができない
    if (navigator.userAgent.match(/iPhone|iPad/)) {
      ;(Object.keys(BGM_SRC) as BGMType[]).forEach((v) => {
        const a = audio.current.get(v)
        if (a) {
          a.pause()
          a.volume = 1
        }
      })
    } else {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          ;(Object.keys(BGM_SRC) as BGMType[]).forEach((v) => {
            const a = audio.current.get(v)
            if (a && a.volume > 0 && v !== currentBgm) {
              a.volume = Math.max(0, a.volume - 0.05)
            }
          })

          if (b && b.volume < 1) {
            b.volume = Math.min(1, b.volume + 0.05)
          }
        }, 100 * i)
      }
    }
    if (b) {
      b.play()
    }
    console.log(b)
  }, [currentBgm])

  const playbtn = (
    <button
      onClick={() => {
        ;(Object.keys(BGM_SRC) as BGMType[]).forEach((v) => {
          const aaa = audio.current.get(v)
          if (!aaa) return
          aaa.muted = false
          aaa.play()
        })
      }}
    >
      PLAY
    </button>
  )

  return {
    currentBgm,
    setBgm,
    isInitializedBgm,
    InitializeBgm,
    loadStatus,
    enableBgmEvent,
    playbtn,
  }
}
