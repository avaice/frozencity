import { ask } from "../modules/ask"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent } from "../types/type"
import { Door } from "./Parts/Parts"

const GoToFrozenCity: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
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
    showMessage("まだ用事があったのを思い出した。")
  }
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

export const ObasanRoom: MapType = {
  type: "INDOOR",
  light: true,
  size: 4,
  map: ["1111", "1011", "1011", "1A11"],
  customWall: {
    A: <Door />,
  },
  events: {
    A: GoToFrozenCity,
  },
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    setBgm("huyuice")
    showMessage(
      "おばさんの店に入った。\n" +
        (status.keys.engine
          ? "おばさん「この前は助かったわ。安くするから何かいかが？」"
          : "おばさん「外が物騒ね...」")
    )
    if(status.keys.engineer === "エンジニア開放" && status.keys.obasan !== "針金販売済"){
      showMessage("新商品があるわよ。")
    }
  },
}
