import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const WolfMonster: Monster = {
  name: "オオカミ",
  image: "monster.png",
  health: 35,
  money: 13,
  exp: 10,
  attack: (status, setStatus, showMessage, setFreeze) =>
    new Promise<number>((resolve) => {
      if (Math.random() > 0.7) {
        showMessage("オオカミはプレーヤーに飛びかかった！")
        setTimeout(() => {
          if (Math.random() > 0.6) {
            showMessage("オオカミが噛みついた！60のダメージ！")
            setStatus((prev) => ({
              ...prev,
              health: Math.max(prev.health - 60, 0),
            }))
            resolve(100)
          } else {
            showMessage("プレーヤーはなんとか避けることができた。")
            resolve(0)
          }
        }, 1500)
      } else {
        const dmg = withMargin(12, 5)
        resolve(monsterAttack(dmg, status, setStatus, showMessage))
      }
    }),
  escapeChance: 0.8,
}
