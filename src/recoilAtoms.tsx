import { atom } from "recoil"
import { INITIAL_SETTING } from "./gameSettings"
import { magicals } from "./magicals"
import { Monster } from "./Monsters/monsterUtils"
import { StatusType } from "./types/type"

export const statusState = atom<StatusType>(INITIAL_SETTING())
export const freezeState = atom<boolean>({
  key: "freezeState",
  default: false,
})
export const messageState = atom<string>({
  key: "messageState",
  default: "",
})

export const monsterState = atom<Monster | undefined>({
  key: "monsterState",
  default: undefined,
})
