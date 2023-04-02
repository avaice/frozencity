import { useCallback, useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import "./App.css"
import { GameWindow } from "./component/GameWindow"
import { cleared_MisororiMonsterEvent } from "./Events/misororiEncountedCow"
import { cleared_obasanEncountedWithMonster } from "./Events/obasanEncountedWithMonster"
import { useBgm } from "./modules/useBgm"
import {
  freezeState,
  inventoryVisibleState,
  messageState,
  monsterState,
  statusState,
} from "./recoilAtoms"
import { ActionEvent, maps, StatusType } from "./types/type"

import nusimLogo from "./resources/logo_mini.png"

export const MSG_SPEED = 200

function App() {
  const [gameState, setGameState] = useState<
    "askUseSound" | "loading" | "loaded" | "title" | "game"
  >("askUseSound")
  const [freeze, setFreeze] = useRecoilState(freezeState) // 入力を受け付けなくするか
  const [status, setStatus] = useRecoilState(statusState)
  const [showingMessage, setShowingMessage] = useState("")
  const [message, showMessage] = useRecoilState(messageState)
  const {
    currentBgm,
    setBgm,
    isInitializedBgm,
    InitializeBgm,
    loadStatus,
    enableBgmEvent,
    playbtn,
  } = useBgm()

  const mapData = maps[status.map]
  const map = maps[status.map].map
  const mapSize = maps[status.map].size
  const events = maps[status.map].events

  const gameWindowRef = useRef<HTMLDivElement>(null)
  const messageWindowRef = useRef<HTMLDivElement>(null)

  const [monster, setMonster] = useRecoilState(monsterState)

  const [isVisibleInventory, setIsVisibleInventory] = useRecoilState(
    inventoryVisibleState
  )

  useEffect(() => {
    setFreeze(!!monster)
    if (!monster) {
      checkBattleAfterEvent()
    }
  }, [monster])

  useEffect(() => {
    setShowingMessage((prev) => `${prev}\n\n${message}`)
    // setShowingMessage((prev) => `${prev}\n`)
    // message.split("\n").forEach((v, i) => {
    //   setTimeout(() => {
    //     setShowingMessage((prev) => `${prev}${v}\n`)
    //   }, MSG_SPEED * i + 1)
    // })
  }, [message])

  useEffect(() => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight
    }
  }, [showingMessage])

  useEffect(() => {
    if (loadStatus[0] === loadStatus[1] && gameState === "loading") {
      setTimeout(() => {
        setGameState("title")
        setBgm("opening")
      }, 3000)
    }
  }, [loadStatus])

  // マップが変わった時のイベント
  useEffect(() => {
    maps[status.map].onEntered(
      status,
      setStatus,
      showMessage,
      setFreeze,
      setBgm,
      setMonster
    )
  }, [status.map])

  // 歩いた時のイベント
  useEffect(() => {
    if (
      map[status.position.y][status.position.x] !== "0" &&
      map[status.position.y][status.position.x] !== "1"
    ) {
      checkAndFireEvent(map[status.position.y][status.position.x])
    }
    maps[status.map].stepEvent(
      { ...status, steps: status.steps + 1 },
      setStatus,
      showMessage,
      setFreeze,
      setBgm,
      setMonster
    )
    if (status.light === 1) {
      showMessage("たいまつが切れた。")
    }
    setStatus((prev) => ({
      ...prev,
      steps: prev.steps + 1,
      light: Math.max(prev.light - 1, 0),
    }))
  }, [status.position])

  const checkBattleAfterEvent = () => {
    if (status.keys.obasan === "モンスター撃退イベント") {
      cleared_obasanEncountedWithMonster(
        status,
        setStatus,
        showMessage,
        setFreeze,
        setBgm,
        setMonster
      )
    }
    if (status.keys.misorori === "モンスター撃退イベントMSRR版_バトル中") {
      cleared_MisororiMonsterEvent(
        status,
        setStatus,
        showMessage,
        setFreeze,
        setBgm,
        setMonster
      )
    }
  }

  const checkAndFireEvent = (key: string) => {
    const msg: string | ActionEvent = (events as any)[key]
    if (msg) {
      if (typeof msg === "string") {
        showMessage(msg)
      } else {
        msg(status, setStatus, showMessage, setFreeze, setBgm, setMonster)
      }
    }
  }

  const switchInventory = () => {
    if (!isVisibleInventory && freeze) {
      return
    }
    setFreeze((prev) => !prev)
    setIsVisibleInventory((prev) => !prev)
  }

  const keyPress = (code: string) => {
    if (code === "Escape") {
      switchInventory()
    }

    if (freeze) {
      return
    }
    switch (code) {
      case "ArrowUp":
        if (status.direction === "N" || status.direction === "S") {
          const diff = status.direction === "N" ? -1 : 1

          if (
            map[status.position.y + diff][status.position.x] !== "1" &&
            !(mapData.customWall as any)[
              map[status.position.y + diff][status.position.x]
            ] &&
            status.position.y + diff >= 0 &&
            status.position.y + diff < mapSize
          ) {
            setStatus((prev) => ({
              ...prev,
              position: {
                x: prev.position.x,
                y: prev.position.y + diff,
              },
            }))
          } else {
            checkAndFireEvent(map[status.position.y + diff][status.position.x])
          }
        } else {
          const diff = status.direction === "W" ? -1 : 1

          if (
            map[status.position.y][status.position.x + diff] !== "1" &&
            !(mapData.customWall as any)[
              map[status.position.y][status.position.x + diff]
            ] &&
            status.position.x + diff >= 0 &&
            status.position.x + diff < mapSize
          ) {
            setStatus((prev) => ({
              ...prev,
              position: {
                x: prev.position.x + diff,
                y: prev.position.y,
              },
            }))
          } else {
            checkAndFireEvent(map[status.position.y][status.position.x + diff])
          }
        }
        break
      case "ArrowRight":
        setStatus((prev) => {
          switch (prev.direction) {
            case "N":
              return { ...prev, direction: "E" }
            case "E":
              return { ...prev, direction: "S" }
            case "W":
              return { ...prev, direction: "N" }
            case "S":
              return { ...prev, direction: "W" }
          }
        })
        break
      case "ArrowLeft":
        setStatus((prev) => {
          switch (prev.direction) {
            case "N":
              return { ...prev, direction: "W" }
            case "E":
              return { ...prev, direction: "N" }
            case "W":
              return { ...prev, direction: "S" }
            case "S":
              return { ...prev, direction: "E" }
          }
        })
        break
    }
  }

  const keyPressEvent = useCallback(
    (e: KeyboardEvent) => {
      keyPress(e.code)
    },
    [status.direction, status.position, freeze, status.keys]
  )

  useEffect(() => {
    document.addEventListener("keyup", keyPressEvent)
    return () => {
      document.removeEventListener("keyup", keyPressEvent)
    }
  }, [status.direction, status.position, freeze, status.keys])

  useEffect(() => {
    if (status.steps < 0) {
      setStatus((prev) => ({ ...prev, steps: 0 }))
    }
  }, [])

  if (gameState === "askUseSound") {
    return (
      <div className="load-window black">
        <div>
          <p>サウンドを有効にしますか？</p>
          <button
            onClick={() => {
              enableBgmEvent()
              setTimeout(() => {
                InitializeBgm(true)
              }, 1000)
              setGameState("loading")
            }}
          >
            はい
          </button>
          <button
            onClick={() => {
              InitializeBgm("NOBGM")
              setGameState("title")
            }}
          >
            いいえ
          </button>
        </div>
      </div>
    )
  }

  if (gameState === "loading") {
    return (
      <div className="load-window fadeIn">
        <div
          className={loadStatus[0] === loadStatus[1] ? "fadeOut" : undefined}
        >
          <img className="logo-img" src={nusimLogo} />
          <p>
            {loadStatus[0] === loadStatus[1]
              ? "(C)2023 avaice"
              : `Loading resources... (${loadStatus[0]}/${loadStatus[1]})`}
          </p>
        </div>
      </div>
    )
  }

  if (gameState === "title") {
    return (
      <div className="load-window">
        <div className="title fadeIn">
          <p>Frozen City</p>
          <div>
            <button
              onClick={() => {
                const savedata = localStorage.getItem("frozen-city-save-data")
                if (savedata) {
                  setStatus(JSON.parse(savedata))
                } else {
                  setStatus((prev) => ({ ...prev, map: "MyRoom" }))
                }

                setGameState("game")
                setBgm(undefined)
              }}
            >
              冒険を始める
            </button>

            {/* <button
              className="delete-savedata"
              onClick={() => {
                if (
                  window.confirm(
                    "冒険の記録が本当に消えてしまいますがよろしいですか？"
                  )
                ) {
                  alert("セーブデータを削除しました。")
                }
              }}
            >
              冒険の記録を消す
            </button> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <main
        className={
          mapData.type === "OUTDOOR"
            ? status.weather === "NIGHT" && status.light > 0
              ? "light"
              : status.weather.toLocaleLowerCase()
            : status.light > 0 || (status.keys.engine && mapData.light)
            ? "light"
            : "night"
        }
      >
        <GameWindow mapData={mapData} windowRef={gameWindowRef} />
        <div
          className="message"
          style={{
            width: `${
              gameWindowRef.current ? gameWindowRef.current.clientWidth - 20 : 0
            }px`,
          }}
          ref={messageWindowRef}
        >
          <p>{showingMessage}</p>
        </div>
        <div className="controller">
          <button className="large" onClick={() => keyPress("ArrowUp")}>
            ↑
          </button>
          <button className="medium" onClick={() => keyPress("ArrowLeft")}>
            ←
          </button>
          <button className="medium" onClick={() => keyPress("ArrowRight")}>
            →
          </button>
          <button className="mini number-buttons">1</button>
          <button className="mini number-buttons">2</button>
          <button className="mini number-buttons">3</button>
          <button className="mini number-buttons">4</button>
          <button className="mini" onClick={() => switchInventory()}>
            Esc
          </button>
        </div>
      </main>
      {status.debug && (
        <div className="debug">
          <p>Debug:</p>
          <p>{JSON.stringify(status)}</p>
        </div>
      )}
    </div>
  )
}

export default App
