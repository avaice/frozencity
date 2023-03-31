import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const BeefMisoSoup: Item = {
  name: "牛だしのおみそ汁",
  description: "長時間煮込んだ牛スープに赤だしの逸品。コクのある味が特徴。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("豪華な味だと思った。HPが回復した。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 30),
    }))
    deleteItem("BeefMisoSoup", status, setStatus)
  },
}
