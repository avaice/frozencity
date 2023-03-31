import { misororiCooking } from "../Events/misororiCooking"
import { ask } from "../modules/ask"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door } from "./Parts/Parts"

const GoToFrozenCity: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "街に戻る？",
    ["出る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "出る") {
    setStatus((prev) => ({
      ...prev,
      map: "FrozenCity",
      position: {
        x: 11,
        y: 9,
      },
      direction: "W",
    }))
  } else {
    showMessage("街に戻るのをやめた。")
  }
}

const GoToYokan: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  showMessage(
    "今にも崩れそうな洋館がある。\n鍵がかかっているが、ごく単純な作りをしているので、針金で開けることができそうだ。"
  )
}
const GoToGesuido: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const result = await ask(
    "マンホールがある。蓋が空いているので、中に入れそうだ。",
    ["入る", "やめておく"],
    setFreeze,
    showMessage
  )
  if (result === "やめておく") {
    return showMessage("身の危険を感じたプレーヤーは、入るのをやめた。")
  }
  setStatus((prev) => ({
    ...prev,
    map: "Gesuido",
    position: {
      x: 2,
      y: 14,
    },
    direction: "E",
  }))
}

const Hachinosu: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  setFreeze(true)
  showMessage("蜂の巣がある...。")
  setTimeout(() => {
    encountMonster("bee", showMessage, setFreeze, setMonster)
  }, 800)
}

const Encount: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  _setBgm,
  setMonster
) => {
  if (!status.keys.canMonsterSpawn) {
    return
  }
  const num = Math.floor(Math.random() * 15)
  if (num < 4) {
    encountMonster("darkGiant", showMessage, setFreeze, setMonster)
  } else {
    encountMonster("cow", showMessage, setFreeze, setMonster)
  }
}

export const Urayama: MapType = {
  type: "OUTDOOR",
  light: false,
  size: 8,
  map: [
    "11111111",
    "1C0111B1",
    "10001101",
    "10100101",
    "1D110101",
    "10110001",
    "1E110111",
    "1111A111",
  ],
  customWall: {
    A: <Door />,
    B: <Door />,
    E: <Door />,
  },
  events: {
    A: GoToFrozenCity,
    B: GoToYokan,
    C: GoToGesuido,
    D: Hachinosu,
    E: "鍵がかかっている。",
  },
  stepEvent: (
    status,
    setStatus,
    showMessage,
    setFreeze,
    setBgm,
    setMonster
  ) => {
    if (Math.random() > (status.keys.engine ? 0.95 : 0.84)) {
      Encount(status, setStatus, showMessage, setFreeze, setBgm, setMonster)
    }
  },
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    showMessage("プレーヤーは裏山に来た。")
    setBgm("greenworld")
  },
}
