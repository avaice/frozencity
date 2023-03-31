import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const DroneMonster: Monster = {
  name: "偵察ドローン",
  image: "monster.png",
  health: 50,
  money: 20,
  exp: 7,
  attack: (status, setStatus, showMessage, setFreeze) =>
    new Promise<number>((resolve) => {
      if (Math.random() > 0.8 || status.map === "AdminRoom") {
        showMessage("ドローンはEMP起動の準備を始めた...")
        setTimeout(() => {
          if (Math.random() > 0.6) {
            showMessage("ドローンのEMP攻撃！200のダメージ！")
            setStatus((prev) => ({
              ...prev,
              health: Math.max(prev.health - 200, 0),
            }))
            resolve(100)
          } else {
            showMessage("ドローンはEMPの起動に失敗した！")
            resolve(0)
          }
        }, 1500)
      } else {
        const dmg = withMargin(12, 1)
        resolve(monsterAttack(dmg, status, setStatus, showMessage))
      }
    }),
  escapeChance: 0.9,
}
