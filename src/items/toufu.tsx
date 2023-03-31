import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Toufu: Item = {
  name: "お豆腐",
  description: "味噌汁の具にしたら美味しそうなお豆腐。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("そのまま食べても美味しいと思った。体力が回復した。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 15),
    }))
    deleteItem("Toufu", status, setStatus)
  },
}
