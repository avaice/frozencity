import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Pittan: Item = {
  name: "かわいいピッタン",
  description: "傷口に貼ると、体力がみるみるうちに回復する。",
  resell: 5,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage(
      `かわいい${
        Math.random() > 0.5 ? "かめ" : "うさぎ"
      }さんのシールを貼った。体力が回復した。`
    )
    setStatus((prev) => ({
      ...prev,
      health: prev.maxHealth,
    }))
    deleteItem("Pittan", status, setStatus)
  },
}
