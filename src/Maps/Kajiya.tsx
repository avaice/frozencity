import { ask } from "../modules/ask"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent } from "../types/type"
import { Door } from "./Parts/Parts"

export const Kajiya: MapType = {
  type: "INDOOR",
  light: true,
  size: 4,
  map: ["1111", "1011", "1011", "1111"],
  customWall: {},
  events: {},
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    setBgm("shibuya")
    showMessage(
      `鍛冶屋に入った。\n老人「よお。${
        !status.keys.engine ? "なんか外が物騒だな。大丈夫か？" : ""
      }」`
    )
  },
}
