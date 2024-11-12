import { ask } from "../modules/ask"
import { Item } from "../types/itemType"
import { StatusType } from "../types/type"

export const Debugger: Item = {
  name: "デバッグ端末",
  description: "Frozen Cityの創造主が落とした端末。",
  resell: 0,
  action: async(
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    showMessage("デバッグ端末を操作した。")
    const result = await ask(
      "HPとお金を最大にしますか？",
      ["はい", "いいえ"],
      setFreeze,
      showMessage
    )
    if(result === "はい"){
      setStatus((prev) => ({
        ...prev,
        debug: !prev.debug,
        health: 999,
        money: 99999,
      }))
    }else{
      setStatus((prev) => ({
        ...prev,
        debug: !prev.debug,
      }))
    }

    showMessage("デバッグ端末を操作した。")
  },
}
