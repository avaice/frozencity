import { Item } from "../../types/itemType"
import { StatusType } from "../../types/type"

export const Knife: Item = {
  name: "サバイバルナイフ",
  description: "そこそこ切れ味の良いナイフ。",
  resell: 10,
  equip: { type: "sword", power: 6 },
  action: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    showMessage: (msg: string) => void,
    setFreeze: React.Dispatch<React.SetStateAction<boolean>>
  ) => {},
}
