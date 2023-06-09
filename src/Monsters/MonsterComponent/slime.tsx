import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const SlimeMonster: Monster = {
  name: "スライム",
  image: "monster.png",
  health: 5,
  money: 2,
  exp: 2,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(4, 1)
    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.9,
}
