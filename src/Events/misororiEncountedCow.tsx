import { encountMonster } from "../Monsters/monsterUtils"
import { ActionEvent } from "../types/type"

export const MisororiMonsterEvent: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  if (status.keys.misorori === "モンスター撃退イベントMSRR版_進行中") {
    setFreeze(true)
    showMessage(
      "助けを求める声の方へ向かうと、そこには巨大な牛に追い詰められているみそろりがいた。"
    )
    setTimeout(() => {
      setStatus((prev) => ({
        ...prev,
        keys: {
          ...prev.keys,
          engine: false,
          misorori: "モンスター撃退イベントMSRR版_バトル中",
        },
      }))
      encountMonster("cow", showMessage, setFreeze, setMonster)
    }, 2000)
  }
}

export const cleared_MisororiMonsterEvent: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  if (status.keys.misorori === "モンスター撃退イベントMSRR版_バトル中") {
    setFreeze(true)
    setStatus((prev) => ({
      ...prev,
      keys: {
        ...prev.keys,
        engine: false,
        misorori: "料理開放",
        engineer: "初対面イベント",
      },
      items: [...prev.items, "Beef", "Pittan"],
    }))
    showMessage("牛を倒した後、プレーヤーはみそろりに話しかけられた。")
    setTimeout(() => {
      showMessage(
        "みそろり「ありがとう...もう無理だと思った..でもこの牛美味しそうだよ！私の家に持ってきてくれたら料理してあげる！」"
      )
      setTimeout(() => {
        showMessage("みそろり「あっ..血が出てるよ。これ使って！」")
        setTimeout(() => {
          showMessage("かわいいピッタンを手に入れた。")
          setTimeout(() => {
            showMessage(
              "みそろり「...あ、あと、さっき知らないおじさんに会ったよ。まだ近くにいると思う。」"
            )
            setFreeze(false)
          }, 2000)
        }, 2500)
      }, 2500)
    }, 2000)
  }
}
