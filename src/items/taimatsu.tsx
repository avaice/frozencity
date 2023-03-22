import { deleteItem } from "../modules/deleteItem"
import { StatusType } from "../types/type"

export const Taimatsu = {
  name: "たいまつ",
  description: "市販品のたいまつ。一定の期間、暗闇を照らすことができる。",
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("たいまつに火を灯した。")
    setStatus((prev) => ({
      ...prev,
      light: 32,
    }))
    deleteItem("Taimatsu", status, setStatus)
  },
}
