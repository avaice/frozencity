import { ask } from "../modules/ask"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Clip: Item = {
  name: "クリップ",
  description: "紙を留めるのに使うクリップ。",
  resell: 15,
  action: async(
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("何に使おう？")
  },
}
