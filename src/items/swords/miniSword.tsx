import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const MiniSword: Item = {
  name: "短剣",
  description: "取り回しのしやすいコンパクトな剣。",
  resell: 40,
  equip: { type: "sword", power: 9 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
