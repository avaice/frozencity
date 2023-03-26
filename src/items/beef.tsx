import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Beef: Item = {
  name: "牛肉",
  description: "調理されていない、生の牛肉。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage(
      "生のまま牛肉を食べた。お腹が痛くなってきた。\n調理してから食べた方が良かったと後悔した。\n体力が減った。。"
    )
    setStatus((prev) => ({
      ...prev,
      health: Math.max(1, prev.health - 30),
    }))
    deleteItem("Beef", status, setStatus)
  },
}
