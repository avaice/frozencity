import { ActionEvent } from "./type"

export type MapType = {
  type: "OUTDOOR" | "INDOOR"
  light: boolean
  size: number
  map: string[]
  customWall: {}
  events: {}
  stepEvent: ActionEvent
  onEntered: ActionEvent
}
