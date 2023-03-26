import { Beef } from "../items/beef"
import { Chocolate } from "../items/chocolate"
import { Debugger } from "../items/debugger"
import { Besuto } from "../items/shields/besuto"
import { WoodBoard } from "../items/shields/woodBoard"
import { Axe } from "../items/swords/axe"
import { ChopStick } from "../items/swords/chopStick"
import { Knife } from "../items/swords/knife"
import { Menbou } from "../items/swords/menbou"
import { TogeSword } from "../items/swords/togeSword"
import { Taimatsu } from "../items/taimatsu"
import { Unagi } from "../items/unagi"
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
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
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
}

// export type Item = {
//   name: string
//   description: string
//   action: ActionEvent
// }
export type ItemType = keyof typeof Items
