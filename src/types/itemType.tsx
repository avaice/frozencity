import { Chocolate } from "../items/chocolate"
import { Taimatsu } from "../items/taimatsu"

export const Items = {
  Taimatsu,
  Chocolate,
}

export type ItemType = keyof typeof Items
