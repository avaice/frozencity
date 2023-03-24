import { atom } from "recoil"
import { StatusType } from "./types/type"

export const statusState = atom<StatusType>({
  key: "statusState",
  default: {
    map: "Title",
    position: {
      x: 1,
      y: 2,
    },
    direction: "N",
    exp: 0,
    money: 0,
    health: 10,
    maxHealth: 10,
    magical: 0,
    level: 1,
    light: 0,
    steps: -1,
    weather: "NIGHT",
    items: ["Chocolate", "Chocolate", "Taimatsu"],
    keys: {
      engine: true,
      adminRoom: false,
    },
  },
})
export const freezeState = atom<boolean>({
  key: "freezeState",
  default: false,
})
export const messageState = atom<string>({
  key: "messageState",
  default: "",
})
