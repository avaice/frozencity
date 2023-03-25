import { ActionEvent } from "./types/type"

export type MagicList = keyof MagicalsType
type MagicalsType = {
  reiki: MagicalType
  oharai: MagicalType
}
type MagicalType = {
  name: string
  magical: number
  action: ActionEvent
}

export const magicals: MagicalsType = {
  reiki: {
    name: "冷気",
    magical: 1,
    action: (status, setStatus, showMessage, setFreeze) => {},
  },
  oharai: {
    name: "お祓い",
    magical: 3,
    action: (status, setStatus, showMessage, setFreeze) => {},
  },
} as const
