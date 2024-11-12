import { misororiCooking } from "../Events/misororiCooking"
import { ask } from "../modules/ask"
import { wait } from "../modules/wait"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door } from "./Parts/Parts"


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

export const Yokan: MapType = {
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
    showMessage("カビ臭い部屋は、何年も開けられていないことを物語っている。ステントグラス越しに入る光も相まって、妖しい雰囲気が漂っている。")
    setBgm("greenworld")
  },
}
