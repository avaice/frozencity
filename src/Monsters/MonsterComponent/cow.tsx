import { withMargin } from "../../modules/withMargin"
import { Monster, monsterAttack } from "../monsterUtils"

export const CowMonster: Monster = {
  name: "野生牛",
  image: "monster.png",
  health: 18,
  money: 0,
  exp: 5,
  attack: (status, setStatus, showMessage, setFreeze): number => {
    const dmg = withMargin(8, 5)

    return monsterAttack(dmg, status, setStatus, showMessage)
  },
  drop: "Beef",
  escapeChance: 0.75,
}
