import { deleteItem } from "../../modules/deleteItem"
import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const WoodBoard: Item = {
  name: "ベニヤ板",
  description: "ホームセンターで売っているベニヤ板。",
  resell: 5,
  equip: { type: "shield", power: 2 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
