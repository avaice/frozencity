import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Debugger: Item = {
  name: "デバッグ端末",
  description: "Frozen Cityの創造主が落とした端末。",
  resell: 0,
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("デバッグ端末を操作した。")
    setStatus((prev) => ({
      ...prev,
      debug: !prev.debug,
      health: 999,
      money: 99999,
    }))
  },
}
