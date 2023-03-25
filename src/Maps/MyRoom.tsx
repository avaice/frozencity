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
  if (!status.keys.tutorial) {
    showMessage("外に出る前に、今の状況を把握したいと思った。")
    return
  }
  const select = await ask(
    "外に出る？",
    ["出る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "出る") {
    showMessage("プレーヤーは、外に出た。")
    setStatus((prev) => ({
      ...prev,
      map: "FrozenCity",
      position: {
        x: 11,
        y: 3,
      },
      direction: "E",
    }))
  } else {
    showMessage("外に出るのが億劫なのは、昔と変わらないなと思った。")
  }
}

const Tutorial: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  showMessage(
    "メモ書きがある。\n「おはようございます。今回はFrozen city projectに参加していただき、ありがとうございました。もし、まだ他の住民が起きてきていなければ、街の外れにあるエンジンの電源を入れてください。2015.12」"
  )
  setStatus((prev) => ({ ...prev, keys: { ...prev.keys, tutorial: true } }))
}

const EncountSlime: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  _setBgm,
  setMonster
) => {
  encountMonster("slime", showMessage, setFreeze, setMonster)
}

export const MyRoom: MapType = {
  type: "INDOOR",
  light: true,
  size: 4,
  map: ["1C11", "1111", "10B1", "1A11"],
  customWall: {
    A: <Door />,
  },
  events: {
    C: EncountSlime,
    B: Tutorial,
    A: GoToFrozenCity,
  },
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    if (!status.keys.tutorial) {
      showMessage("...目が覚めたら、気味が悪いほど静かだった。")
    } else if (status.keys.misorori) {
      showMessage("家に帰った。ずっと住んでいる家の香りは安心する。")
      setBgm("shibuya")
    }
  },
}
