import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const DarkGiantMonster: Monster = {
  name: "ダークジャイアント",
  image: "monster.png",
  health: 18,
  money: 9,
  exp: 5,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(10, 1)

    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.8,
}
