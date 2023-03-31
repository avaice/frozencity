import { SetterOrUpdater } from "recoil"
import { Beef } from "../items/beef"
import { BeefMisoSoup } from "../items/beefMisoSoup"
import { Chocolate } from "../items/chocolate"
import { ChocolateMisoSoup } from "../items/chocolateMisoSoup"
import { Debugger } from "../items/debugger"
import { GiantFue } from "../items/giantFue"
import { MisoSoup } from "../items/misoSoup"
import { Pork } from "../items/pork"
import { PremiumTaimatsu } from "../items/premiumTaimatsu"
import { Besuto } from "../items/shields/besuto"
import { WoodBoard } from "../items/shields/woodBoard"
import { Axe } from "../items/swords/axe"
import { ChopStick } from "../items/swords/chopStick"
import { Knife } from "../items/swords/knife"
import { Menbou } from "../items/swords/menbou"
import { TogeSword } from "../items/swords/togeSword"
import { Taimatsu } from "../items/taimatsu"
import { Toufu } from "../items/toufu"
import { Unagi } from "../items/unagi"
import { UnagiMisoSoup } from "../items/unagiMisoSoup"
import { BGMType } from "../modules/useBgm"
import { Monster } from "../Monsters/monsterUtils"
import { ActionEvent, StatusType } from "./type"

export type Item = {
  name: string
  description: string
  resell?: number
  equip?: { type: "sword" | "shield"; power: number }
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>,
    setBgm: React.Dispatch<React.SetStateAction<BGMType | undefined>>,
    setMonster: SetterOrUpdater<Monster | undefined>
  ) => void
}
export const Items = {
  Taimatsu,
  Chocolate,
  Unagi,
  Debugger,
  ChopStick,
  WoodBoard,
  Menbou,
  Axe,
  TogeSword,
  Knife,
  Beef,
  Besuto,
  MisoSoup,
  UnagiMisoSoup,
  BeefMisoSoup,
  ChocolateMisoSoup,
  Pork,
  Toufu,
  GiantFue,
  PremiumTaimatsu,
}

// export type Item = {
//   name: string
//   description: string
//   action: ActionEvent
// }
export type ItemType = keyof typeof Items
