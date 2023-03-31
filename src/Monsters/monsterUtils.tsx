import { SetterOrUpdater, useRecoilState } from "recoil"
import { BGMType } from "../modules/useBgm"
import { monsterState } from "../recoilAtoms"
import { Items, ItemType } from "../types/itemType"
import { ActionEvent, StatusType } from "../types/type"
import { BeeMonster } from "./MonsterComponent/bee"
import { CowMonster } from "./MonsterComponent/cow"
import { DarkGiantMonster } from "./MonsterComponent/darkGiant"
import { DroneMonster } from "./MonsterComponent/drone"
import { GiantMonster } from "./MonsterComponent/giant"
import { MouseMonster } from "./MonsterComponent/mouse"
import { PiraniaMonster } from "./MonsterComponent/pirania"
import { SlimeMonster } from "./MonsterComponent/slime"

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
  ) => number | Promise<number>
  drop?: ItemType
  money?: number
  exp: number
  escapeChance: number
}

const monsters = {
  slime: SlimeMonster,
  giant: GiantMonster,
  darkGiant: DarkGiantMonster,
  cow: CowMonster,
  bee: BeeMonster,
  drone: DroneMonster,
  pirania: PiraniaMonster,
  mouse: MouseMonster,
}

export const monsterAttack = (
  power: number,
  status: StatusType,
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
  showMessage: (msg: string) => void
): number => {
  const shield = Items[status.equipments.shield].equip
  const dmg = Math.max(0, power - (shield ? shield.power : 0))
  showMessage(`プレーヤーは${dmg}ダメージを受けた！`)
  setStatus((prev) => ({ ...prev, health: Math.max(prev.health - dmg, 0) }))
  return dmg
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
