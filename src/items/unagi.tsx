import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Unagi: Item = {
  name: "うなぎ",
  description: "調理されていない、生のうなぎ。蒲焼にすると美味しい。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage(
      "生のうなぎにそのまま食らいついた。\n調理してから食べた方が良かったと後悔した。\n体力が少し回復した。"
    )
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 5),
    }))
    deleteItem("Unagi", status, setStatus)
  },
}
