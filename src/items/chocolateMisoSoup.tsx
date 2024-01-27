import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const ChocolateMisoSoup: Item = {
  name: "チョコレート味噌汁",
  description: "味噌汁は甘くないという固定観念を取っ払った意欲的な味噌汁。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("味噌汁は甘くないほうがいい。体力が少し回復した。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 8),
    }))
    deleteItem("ChocolateMisoSoup", status, setStatus)
  },
}
