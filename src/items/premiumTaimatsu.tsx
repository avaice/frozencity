import { deleteItem } from "../modules/deleteItem"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const PremiumTaimatsu: Item = {
  name: "へびたいまつ",
  description: "お出かけ用の長持ちたいまつ。長時間、暗闇を照らすことができる。",
  resell: 2,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("へびたいまつに火を灯した。")
    setStatus((prev) => ({
      ...prev,
      light: 128,
    }))
    deleteItem("PremiumTaimatsu", status, setStatus)
  },
}
