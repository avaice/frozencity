import { encountMonster } from "../Monsters/monsterUtils"
import { ActionEvent } from "../types/type"

export const obasanEncountedWithMonster: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  if (status.keys.obasan !== "モンスター撃退イベント") {
    return
  }
  setFreeze(true)
  showMessage(
    "プレーヤーが叫び声を聞いて住宅街の方へ戻ると、そこでは白髪混じりの小柄な女性が得体の知れない生物に襲われていた。"
  )
  setTimeout(() => {
    encountMonster("slime", showMessage, setFreeze, setMonster)
  }, 2500)
}

export const cleared_obasanEncountedWithMonster: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  setFreeze(true)
  setTimeout(() => {
    showMessage(
      "プレーヤーがモンスターを退治をすると、おばさんはプレーヤーに話しかけてきた。"
    )
    setTimeout(() => {
      showMessage(
        "おばさん\n「あなたがいなかったら助からなかったわ。\nほんの少しだけど、これをあげる。\n私もこの街に住んでいるから、よかったら来てくださいね。」"
      )
      setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          money: prev.money + 40,
          keys: {
            ...prev.keys,
            obasan: "モンスターから助けた",
            misorori: "周りの調査完了",
            canMonsterSpawn: true,
          },
        }))
        showMessage("40Gをもらった。")
        setTimeout(() => {
          showMessage(
            "プレーヤーは、このことをみそろりに報告しに行こうと思った。"
          )
          setFreeze(false)
        }, 1000)
      }, 2000)
    }, 2000)
  }, 1000)
}
