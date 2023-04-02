import { misororiCooking } from "../Events/misororiCooking"
import { ask } from "../modules/ask"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door } from "./Parts/Parts"

const GoToUrayama: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "マンホールの上に出る？",
    ["出る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "出る") {
    showMessage("プレーヤーは、外に出た。")
    setStatus((prev) => ({
      ...prev,
      map: "Urayama",
      position: {
        x: 2,
        y: 1,
      },
      direction: "E",
    }))
  } else {
    showMessage("もう少し下水道にとどまることにした。")
  }
}

const GoToRecycleShop: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "【RECYCLE MANIA】",
    ["入る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "入る") {
    setStatus((prev) => ({
      ...prev,
      map: "RecycleShop",
      position: {
        x: 1,
        y: 2,
      },
      direction: "N",
    }))
  } else {
    showMessage("もう少し下水道にとどまることにした。")
  }
}

const GoToSuidokyoku: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  showMessage("【水道局】\n鍵がかかっている。")
}
const GoToNorthCity: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  showMessage("【↑NorthCity】と書かれた梯子がある。")
}

const GoToAjito: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  showMessage("謎の扉がある...が、バリケードが張られていて入れない。")
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
  if (num < 5) {
    encountMonster("mouse", showMessage, setFreeze, setMonster)
  } else if (num < 12) {
    encountMonster("pirania", showMessage, setFreeze, setMonster)
  } else {
    encountMonster("drone", showMessage, setFreeze, setMonster)
  }
}

export const Gesuido: MapType = {
  type: "INDOOR",
  light: false,
  size: 16,
  map: [
    "1111111111111111",
    "1111111111111111",
    "1E0000000000000B",
    "1100011011F11101",
    "1000001011111101",
    "1011101011111111",
    "101D1C1000000001",
    "1010110011111111",
    "1000000000000001",
    "1111110011111111",
    "1111110000011111",
    "1111110011000011",
    "1100000011011011",
    "1111110000000011",
    "1A00000011111011",
    "1111111111111111",
  ],
  customWall: {
    A: <Door />,
    B: <Door />,
    C: <Door />,
    D: <Door />,
    E: <Door />,
    F: <Door />,
  },
  events: {
    A: GoToUrayama,
    B: GoToSuidokyoku,
    C: GoToNorthCity,
    D: GoToAjito,
    E: "鍵がかかっている。",
    F: GoToRecycleShop,
  },
  stepEvent: (
    status,
    setStatus,
    showMessage,
    setFreeze,
    setBgm,
    setMonster
  ) => {
    if (Math.random() > (status.light > 0 ? 0.97 : 0.84)) {
      Encount(status, setStatus, showMessage, setFreeze, setBgm, setMonster)
    }
  },
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    showMessage("下水道に入った。")
    setBgm("gesuido")
  },
}
