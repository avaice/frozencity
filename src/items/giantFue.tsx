import { encountMonster } from "../Monsters/monsterUtils"
import { Item } from "../types/itemType"

export const GiantFue: Item = {
  name: "ジャイアントの笛",
  description: "ジャイアントが仲間を呼ぶときに使う笛。",
  resell: 0,
  action: (status, setStatus, showMessage, setFreeze, setBgm, setMonster) => {
    setFreeze(true)
    showMessage("ジャイアントの笛「ポオ〜ポオ〜」")
    setTimeout(() => {
      encountMonster("darkGiant", showMessage, setFreeze, setMonster)
    }, 1200)
  },
}
