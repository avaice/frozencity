import { deleteItem } from "../modules/deleteItem"
import { StatusType } from "../types/type"

export const Chocolate = {
  name: "チョコレート",
  description:
    "板状のホワイトチョコレート。この町では何故か至る所で得ることができる。",
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("チョコレートを食べた。美味しかった。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 10),
    }))
    deleteItem("Chocolate", status, setStatus)
  },
}
