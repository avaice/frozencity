import { deleteItem } from "../../modules/deleteItem"
import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const SutenresuTate: Item = {
  name: "ステンレス盾",
  description: "錆びない盾。そこそこの防御力。",
  resell: 25,
  equip: { type: "shield", power: 8 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
