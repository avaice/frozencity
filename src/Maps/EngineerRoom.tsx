import { misororiCooking } from "../Events/misororiCooking"
import { ask } from "../modules/ask"
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
        x: 4,
        y: 3,
      },
      direction: "S",
    }))
  } else {
    showMessage("外に出るのが億劫なのは、昔と変わらないなと思った。")
  }
}

const Engineer: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  if (
    (await ask(
      "おじさん「力を底上げできるか見てやろうか？」",
      ["はい", "やめておく"],
      setFreeze,
      showMessage
    )) === "やめておく"
  ) {
    return showMessage("おじさん「そうか。」")
  }
  const needExp = 20 * Math.pow(1.7, status.level)
  const needMoney = 20 * status.level

  if (status.debug) {
    console.log("必要Exp：" + needExp)
  }

  if (status.exp > needExp) {
    if (
      (await ask(
        `底上げできるぞ。${needMoney}G必要だが、どうする？`,
        ["する", "やめておく"],
        setFreeze,
        showMessage
      )) === "やめておく"
    ) {
      return showMessage("おじさん「そうか。」")
    }

    if (status.money < needMoney) {
      return showMessage("お金が足りない。")
    }
    setStatus((prev) => ({
      ...prev,
      level: prev.level + 1,
      exp: 0,
      maxHealth: Math.floor(Math.pow(15, (10 + prev.level + 1) / 10)),
      money: prev.money - needMoney,
    }))
    showMessage("おじさん「よし、これでできたぞ。」")
    setFreeze(true)
    setTimeout(() => {
      showMessage("レベルが" + (status.level + 1) + "に上がった！")
      setFreeze(false)
    }, 500)
  } else {
    if (status.exp / needExp > 0.8) {
      showMessage("おじさん「もうちょっとで底上げできそうだぞ。頑張れよ。」")
    } else {
      showMessage("おじさん「まだ出来なさそうだな。」")
    }
  }
}

export const EngineerRoom: MapType = {
  type: "INDOOR",
  light: true,
  size: 5,
  map: ["11111", "100C1", "10111", "10B11", "1A111"],
  customWall: {
    A: <Door />,
    C: <Door />,
  },
  events: {
    C: "おじさん「そっちは立ち入り禁止だ。」",
    B: Engineer,
    A: GoToFrozenCity,
  },
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    showMessage("おじさん「よお。どうしたよ」")
    setBgm("obasan")
  },
}
