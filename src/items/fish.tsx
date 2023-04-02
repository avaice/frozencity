import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Fish: Item = {
  name: "お魚",
  description: "下水道を泳いでいた汚い魚。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage(
      "生のままお魚を食べた。お腹が痛くなってきた。\n調理してから食べた方が良かったと後悔した。\n体力が減った。。"
    )
    setStatus((prev) => ({
      ...prev,
      health: Math.max(1, prev.health - 30),
    }))
    deleteItem("Fish", status, setStatus)
  },
}
