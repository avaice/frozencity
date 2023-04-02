import { MapType } from "../types/mapType"

export const RecycleShop: MapType = {
  type: "INDOOR",
  light: true,
  size: 4,
  map: ["1111", "1011", "1011", "1A11"],
  customWall: {},
  events: {},
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    setBgm("huyuice")
    showMessage(
      "RECYCLE MANIAに入った。\n" +
        "ロボット店員「イラッシャイ！イラッシャイ！」"
    )
    setFreeze(true)
  },
}
