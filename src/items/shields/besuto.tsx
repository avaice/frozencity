import { deleteItem } from "../../modules/deleteItem"
import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const Besuto: Item = {
  name: "鉄板入りベスト",
  description: "中に鉄板が入っているベスト。",
  resell: 10,
  equip: { type: "shield", power: 5 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
