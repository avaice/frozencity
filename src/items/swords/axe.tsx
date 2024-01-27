import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const Axe: Item = {
  name: "斧",
  description: "普通の斧。",
  resell: 60,
  equip: { type: "sword", power: 15 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
