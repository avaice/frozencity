import { ask } from "../modules/ask"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door } from "./Parts/Parts"

export const Title: MapType = {
  type: "INDOOR",
  light: true,
  size: 4,
  map: ["1111", "1111", "10B1", "1A11"],
  customWall: {},
  events: {},
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {},
}
