import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const PiraniaMonster: Monster = {
  name: "ピラニア",
  image: "monster.png",
  health: 29,
  money: 10,
  exp: 14,
  drop: "Fish",
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(14, 1)
    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.9,
}
