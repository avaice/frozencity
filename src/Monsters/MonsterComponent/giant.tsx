import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const GiantMonster: Monster = {
  name: "ジャイアント",
  image: "monster.png",
  health: 12,
  money: 5,
  exp: 4,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(5, 6)

    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.8,
}
