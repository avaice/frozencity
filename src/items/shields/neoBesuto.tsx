import { deleteItem } from "../../modules/deleteItem"
import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const NeoBesuto: Item = {
  name: "ネオ鉄板入りベスト",
  description: "最新型の鉄板入りベスト。新開発の素材で攻撃を軽々とかわす。",
  resell: 40,
  equip: { type: "shield", power: 12 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
