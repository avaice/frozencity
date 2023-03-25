import { obasanEncountedWithMonster } from "../Events/obasanEncountedWithMonster"
import { ask } from "../modules/ask"
import { messageByDirection } from "../modules/messageByDirection"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door, Toggle } from "./Parts/Parts"

const GoToMagicalRoom: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "不思議な模様の扉がある。",
    ["扉を開ける", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "扉を開ける") {
    if (!status.keys.adminRoom) {
      showMessage("鍵がかかっていて開かない。")
      return
    }
    setStatus((prev) => ({
      ...prev,
      map: "AdminRoom",
      position: {
        x: 1,
        y: 6,
      },
      direction: "N",
    }))
  } else {
    showMessage(
      "重そうな扉は、見るからに危険な雰囲気を放っていた。\nここには入らない方が良いかもしれない。"
    )
  }
}

const GoToMyRoom: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "物心付いた時からこの家に住んでいた。",
    ["家に入る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "家に入る") {
    setStatus((prev) => ({
      ...prev,
      map: "MyRoom",
      position: {
        x: 1,
        y: 2,
      },
      direction: "N",
    }))
  } else {
    showMessage(
      "家に帰る前にやりたいことがあったのを、プレーヤーは思い出した。"
    )
  }
}

const GoToObasan: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  if (!status.keys.obasan) {
    showMessage("鍵がかかっていて開かない。")
    return
  }

  const select = await ask(
    "おばさんの家。",
    ["入る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "入る") {
    setStatus((prev) => ({
      ...prev,
      map: "MyRoom",
      position: {
        x: 1,
        y: 2,
      },
      direction: "N",
    }))
  } else {
    showMessage("あとでにしようと思った。")
  }
}

const GoToStation: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  showMessage("【A STATION】\n家から最寄りの鉄道駅。今は動いていない。")
}
const GoToUrayama: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  showMessage("【裏山】\n学校の裏にある、小さな山。がれきがあって進めない。")
}

const EngineToggle: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  if (status.keys.engine) {
    showMessage("【FrozenCity 稼動用エンジン】\n電源が入っている。")
    return
  }
  const select = await ask(
    "【FrozenCity 稼動用エンジン】\n電源は入っていない。",
    ["電源を入れる", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "電源を入れる") {
    showMessage(
      "電源ボタンを押したと同時に、街は明るくなり、機械の動く無機質な音が響き渡った。"
    )
    setStatus((prev) => ({
      ...prev,
      weather: "DAY",
      keys: { ...prev.keys, engine: true },
    }))
  } else {
    showMessage(
      "本当に押してしまって良いのか不安に思ったプレーヤーは、ボタンを押すのを躊躇してしまった。"
    )
  }
}

const GoToMisorori: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "幼馴染の家。よく家族で集まって食事をした。",
    ["入る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "入る") {
    if (!status.keys.engine) {
      showMessage("鍵がかかっていて開かない。")
      return
    }
    setStatus((prev) => ({
      ...prev,
      map: "MisororiRoom",
      position: {
        x: 1,
        y: 2,
      },
      direction: "N",
    }))
  } else {
    showMessage("会うのはまた今度にしようと思った。")
  }
}

const GoToEngineer: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "【ENGINEERING SERVICES】",
    ["入る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "入る") {
    if (!status.keys.engine || !status.keys.isThawedEngineer) {
      showMessage("鍵がかかっていて開かない。")
      return
    }
  } else {
    showMessage("特に用事が思いつかなかったので、入るのをやめた。")
  }
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
  encountMonster("slime", showMessage, setFreeze, setMonster)
}

const EnterJutakugai: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  messageByDirection("住宅街に入った。", "N")(
    status,
    setStatus,
    showMessage,
    setFreeze,
    setBgm,
    setMonster
  )

  if (status.keys.misorori === "初めて再会" && !status.keys.obasan) {
    setFreeze(true)
    showMessage(
      "プレーヤーが住宅街を出ようとした時、後ろの方から甲高い叫び声がした。"
    )
    setStatus((prev) => ({
      ...prev,
      keys: { ...prev.keys, obasan: "モンスター撃退イベント" },
    }))
    setTimeout(() => {
      setFreeze(false)
    }, 2000)
  }
}

export const FrozenCity: MapType = {
  type: "OUTDOOR",
  light: false,
  size: 16,
  map: [
    "1111111111111111",
    "10000000000M000G",
    "1011E11101101101",
    "1H11000001B0DL01",
    "1111F111111F1111",
    "1000000000000001",
    "1311111111111111",
    "1000000211111111",
    "1110111111111111",
    "111011000000K111",
    "1110110111111111",
    "1110110110000111",
    "11A0110010100111",
    "1110J00010000111",
    "11101110I0011111",
    "111C111111111111",
  ],
  customWall: {
    A: <Door />,
    B: <Door />,
    C: <Toggle />,
    D: <Door />,
    E: <Door />,
    G: <Door />,
    K: <Door />,
    L: <Door />,
  },
  events: {
    "2": "張り紙がある。\n「能力アップのご相談はエンジニアサービスまで！」",
    "3": messageByDirection("路地裏に入った。", "S"),
    A: GoToMagicalRoom,
    B: GoToMyRoom,
    C: EngineToggle,
    D: GoToMisorori,
    E: GoToEngineer,
    F: EnterJutakugai,
    G: GoToStation,
    H: "この辺りだけ、空から変な光が差している。",
    I: messageByDirection("【小学校裏】", "E"),
    J: messageByDirection("【小学校】", "E"),
    K: GoToUrayama,
    L: GoToObasan,
    M: obasanEncountedWithMonster,
  },
  stepEvent: (
    status,
    setStatus,
    showMessage,
    setFreeze,
    setBgm,
    setMonster
  ) => {
    if (Math.random() > 0.96) {
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
