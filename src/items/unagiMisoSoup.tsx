import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const UnagiMisoSoup: Item = {
  name: "うなぎの味噌汁",
  description: "うなぎを丸ごと１匹使って作りました。元気の出る味噌汁。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("飲んだ途端にパワーがみなぎってきた。\n体力が回復した。")
    setStatus((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + 35),
    }))
    deleteItem("UnagiMisoSoup", status, setStatus)
  },
}
