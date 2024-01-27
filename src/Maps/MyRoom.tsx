import { ask } from "../modules/ask"
import { gameSave } from "../modules/saveData"
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

const Save: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  _setBgm,
  setMonster
) => {
  const savedata = JSON.stringify({
    ...status,
    position: {
      x: 1,
      y: 2,
    },
  })
  const result = await ask(
    "ゲームデータを保存しますか？",
    localStorage.getItem("useCloudSave")
      ? ["はい", "いいえ", "クラウドセーブIDの確認"]
      : ["はい", "いいえ" /** "クラウドセーブを有効化" */],
    setFreeze,
    showMessage
  )
  if (result === "はい") {
    if (await gameSave(savedata)) {
      showMessage("保存完了")
    } else {
      if (localStorage.getItem("useCloudSave") === "yes") {
        showMessage(
          "クラウドへの保存に失敗しました。\nインターネットに接続されているかご確認ください。"
        )
      } else {
        showMessage("保存中に不明なエラー。でも保存はできています。")
      }
    }
  } else if (result === "クラウドセーブを有効化") {
    if (
      (await ask(
        "クラウドセーブを有効化すると、パソコンとスマホでゲームデータが同期できます。\n有効化しますか？",
        ["はい", "いいえ"],
        setFreeze,
        showMessage
      )) === "はい"
    ) {
      localStorage.setItem("useCloudSave", "yes")
      if (await gameSave(savedata)) {
        showMessage("保存完了")
      } else {
        showMessage(
          "クラウドへの保存に失敗しました。\nインターネットに接続されているかご確認ください。"
        )
      }
    } else {
      showMessage("クラウドセーブの設定をキャンセルしました。")
    }
  } else if (result === "クラウドセーブIDの確認") {
    showMessage(`IDは${localStorage.getItem("dataUniqueKey")}です。`)
  } else {
    showMessage("保存しませんでした")
  }
}

export const MyRoom: MapType = {
  type: "INDOOR",
  light: true,
  size: 4,
  map: ["1111", "1C11", "10B1", "1A11"],
  customWall: {
    A: <Door />,
  },
  events: {
    C: Save,
    B: Tutorial,
    A: GoToFrozenCity,
  },
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    if (!status.keys.tutorial) {
      showMessage(
        "...目が覚めたら、気味が悪いほど静かだった。\n【矢印キーで操作します。セーブはこの部屋を前に進むとできます。】"
      )
    } else if (status.keys.misorori) {
      showMessage("家に帰った。ずっと住んでいる家の香りは安心する。")
      setBgm(undefined)
    }
  },
}
