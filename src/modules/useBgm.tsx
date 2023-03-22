import { useEffect, useRef, useState } from "react"

const BGM_SRC = {
  opening: "./sounds/opening.mp3",
  greenworld: "./sounds/greenworld.mp3",
  shibuya: "./sounds/shibuya.mp3",
  msrr: "./sounds/msrr.mp3",
  cheezecake: "./sounds/cheezecake.mp3",
  huyuice: "./sounds/huyuice.mp3",
}

export type BGMType = keyof typeof BGM_SRC
export const useBgm = () => {
  const [currentBgm, setBgm] = useState<BGMType>()
  const [isInitializedBgm, InitializeBgm] = useState<boolean | "NOBGM">(false)
  const audio = useRef(new Map<BGMType, HTMLAudioElement>())

  useEffect(() => {
    if (!isInitializedBgm || isInitializedBgm === "NOBGM") {
      return
    }
    ;(Object.keys(BGM_SRC) as BGMType[]).forEach((v) => {
      const newAudio = new Audio()
      newAudio.autoplay = false
      newAudio.src = BGM_SRC[v]
      newAudio.loop = true
      newAudio.volume = 0
      audio.current.set(v, newAudio)
    })
  }, [isInitializedBgm])

  useEffect(() => {
    if (!currentBgm) {
      return
    }
    const b = audio.current.get(currentBgm)
    if (!b) {
      return
    }
    b.currentTime = 0

    // iOSはゴミだからボリューム調整ができない
    if (navigator.userAgent.match(/iPhone|iPad/)) {
      ;(Object.keys(BGM_SRC) as BGMType[]).forEach((v) => {
        const a = audio.current.get(v)
        if (a) {
          a.pause()
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

          if (b.volume < 1) {
            b.volume = Math.min(1, b.volume + 0.05)
          }
        }, 100 * i)
      }
    }

    b.play()
  }, [currentBgm])

  return { currentBgm, setBgm, isInitializedBgm, InitializeBgm }
}
