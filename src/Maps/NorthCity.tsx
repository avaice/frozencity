import { MeetEngineerEvent } from "../Events/encountedEngineerAtUrayama"
import { MisororiMonsterEvent } from "../Events/misororiEncountedCow"
import { obasanEncountedWithMonster } from "../Events/obasanEncountedWithMonster"
import { ask } from "../modules/ask"
import { messageByDirection } from "../modules/messageByDirection"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door, Toggle } from "./Parts/Parts"

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
    encountMonster("giant", showMessage, setFreeze, setMonster)
  } else {
    encountMonster("slime", showMessage, setFreeze, setMonster)
  }
}

export const NorthCity: MapType = {
  type: "OUTDOOR",
  light: false,
  size: 16,
  map: [
    "1111111111111111",
    "10000000000000MG",
    "1011E11101101101",
    "1H11000001B0DL01",
    "1111F111111F1111",
    "1000000000000001",
    "1311111111111111",
    "1000000211111111",
    "11101N1111111111",
    "111011000000K111",
    "1110110111111111",
    "111011011000O111",
    "11A01100101001P1",
    "1110J00010000101",
    "11101110I0010001",
    "111C111111111111",
  ],
  customWall: {},
  events: {},
  stepEvent: (
    status,
    setStatus,
    showMessage,
    setFreeze,
    setBgm,
    setMonster
  ) => {
    if (Math.random() > (status.keys.engine ? 0.97 : 0.88)) {
      Encount(status, setStatus, showMessage, setFreeze, setBgm, setMonster)
    }
  },
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    if (status.keys.engine) {
      setBgm("cheezecake")
    } else {
      setBgm("greenworld")
    }
  },
}
