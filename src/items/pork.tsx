import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Pork: Item = {
  name: "豚肉",
  description: "調理されていない、生の豚肉。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage(
      "生のまま豚肉を食べた。お腹が痛くなってきた。\n調理してから食べた方が良かったと後悔した。\n体力が減った。。"
    )
    setStatus((prev) => ({
      ...prev,
      health: Math.max(1, prev.health - 50),
    }))
    deleteItem("Pork", status, setStatus)
  },
}
