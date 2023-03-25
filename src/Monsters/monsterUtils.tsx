import { SetterOrUpdater, useRecoilState } from "recoil"
import { BGMType } from "../modules/useBgm"
import { monsterState } from "../recoilAtoms"
import { ItemType } from "../types/itemType"
import { ActionEvent, StatusType } from "../types/type"
import { slimeMonster } from "./MonsterComponent/slime"

export type Monster = {
  image: string
  name: string
  health: number
  kaiwa?: ActionEvent
  attack: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>,
    setBgm: React.Dispatch<React.SetStateAction<BGMType | undefined>>,
    setMonster: SetterOrUpdater<Monster | undefined>
  ) => number
  drop?: ItemType
  money?: number
  exp: number
  escapeChance: number
}

const monsters = {
  slime: slimeMonster,
}

export const monsterAttack = async (
  power: number,
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
  showMessage: (msg: string) => void
) => {
  showMessage(`プレーヤーは${power}ダメージを受けた！`)
  setStatus((prev) => ({ ...prev, health: Math.max(prev.health - power, 0) }))
}

export const encountMonster = (
  monsterKey: keyof typeof monsters,
  showMessage: (msg: string) => void,
  setFreeze: React.Dispatch<React.SetStateAction<boolean>>,
  setMonster: SetterOrUpdater<Monster | undefined>
) => {
  const monster = monsters[monsterKey]
  setFreeze(true)
  showMessage(`${monster.name}が現れた！`)
  setTimeout(() => {
    setMonster(monster)
  }, 1500)
}
