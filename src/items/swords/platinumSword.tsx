import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const PlatinumSword: Item = {
  name: "プラチナ剣",
  description: "ラグジュアリーな剣。耐久性・攻撃性抜群",
  resell: 200,
  equip: { type: "sword", power: 18 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
