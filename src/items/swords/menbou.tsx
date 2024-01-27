import { deleteItem } from "../../modules/deleteItem"
import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const Menbou: Item = {
  name: "麺棒",
  description:
    "自炊に凝った人が麺からラーメンを作るために使う棒。攻撃力はあまり高くない。",
  resell: 0,
  equip: { type: "sword", power: 5 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
