import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const MisoSoup: Item = {
  name: "味噌汁",
  description: "具なしの味噌汁。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("味加減が絶妙だと思った。\n体力がわずかに回復した。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 5),
    }))
    deleteItem("MisoSoup", status, setStatus)
  },
}
