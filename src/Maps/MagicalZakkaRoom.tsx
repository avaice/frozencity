import { MapType } from "../types/mapType"

export const MagicalZakkaRoom: MapType = {
  type: "INDOOR",
  light: false,
  size: 4,
  map: ["1111", "1011", "1011", "1111"],
  customWall: {},
  events: {},
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    setBgm("gesuido")
    showMessage(
      "不気味な雰囲気の店内には、他の場所ではまず見ることがないような商品が並んでいた。\n" +
        (status.keys.engine
          ? "老婆「いらっしゃい。」"
          : "ダークジャイアント「繝ｨ繧ｦ繧ｳ繧ｽ繝ｨ繧ｦ繧ｳ繧ｽ」")
    )
  },
}
