import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const CowMonster: Monster = {
  name: "野生牛",
  image: "monster.png",
  health: 30,
  money: 0,
  exp: 10,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(8, 5)

    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  escapeChance: 0.75,
}
