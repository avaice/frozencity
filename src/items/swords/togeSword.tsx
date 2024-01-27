import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const TogeSword: Item = {
  name: "棘剣",
  description: "刃に棘がある剣。刺されるとかなり痛い。",
  resell: 400,
  equip: { type: "sword", power: 40 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
