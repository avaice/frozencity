import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const MouseMonster: Monster = {
  name: "ネズミ",
  image: "monster.png",
  health: 8,
  money: 6,
  exp: 5,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(18, 2)
    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.2,
}
