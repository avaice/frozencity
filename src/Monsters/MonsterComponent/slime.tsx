import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const slimeMonster: Monster = {
  name: "スライム",
  image: "monster.png",
  health: 5,
  money: 2,
  exp: 2,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(2, 1)
    monsterAttack(dmg, setStatus, showMessage)
    return dmg
  },
  escapeChance: 0.9,
}
