import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Chocolate: Item = {
  name: "チョコレート",
  description:
    "板状のホワイトチョコレート。この町では何故か至る所で得ることができる。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("チョコレートを食べた。美味しかった。体力が回復した。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 10),
    }))
    deleteItem("Chocolate", status, setStatus)
  },
}
