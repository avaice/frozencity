import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const FishMisoSoup: Item = {
  name: "魚介味噌汁",
  description: "美味しい白身魚を使った、海の幸豊富な味噌汁。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("とてもおいしかった。\n体力が回復した。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 20),
    }))
    deleteItem("FishMisoSoup", status, setStatus)
  },
}
