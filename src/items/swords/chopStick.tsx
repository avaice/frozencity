import { deleteItem } from "../../modules/deleteItem"
import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const ChopStick: Item = {
  name: "お箸",
  description: "自分の部屋にあった箸。武器としては心許ない。",
  resell: 0,
  equip: { type: "sword", power: 2 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
