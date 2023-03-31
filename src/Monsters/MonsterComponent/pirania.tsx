import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const PiraniaMonster: Monster = {
  name: "ピラニア",
  image: "monster.png",
  health: 27,
  money: 10,
  exp: 14,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(12, 1)
    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.9,
}
