import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const BeeMonster: Monster = {
  name: "スズメバチ",
  image: "monster.png",
  health: 80,
  money: 12,
  exp: 9,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(12, 7)
    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.4,
}
