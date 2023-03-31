import { ask } from "../modules/ask"
import { encountMonster } from "../Monsters/monsterUtils"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door } from "./Parts/Parts"

const WeatherController: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "機械が置いてある。\n端の方には、今にも読めなくなってしまいそうな掠れた文字で、「天気はここで操作されている」と書かれている。",
    ["晴れを祈る", "雨を祈る", "夜にする", "何もしない"],
    setFreeze,
    showMessage
  )
  switch (select) {
    case "晴れを祈る":
      showMessage("天気が良くなることを祈りながら、ボタンを力強く押した。")
      setStatus((prev) => ({ ...prev, weather: "DAY" }))
      return
    case "雨を祈る":
      showMessage("雨になることを祈りながら、ボタンを力強く押した。")
      setStatus((prev) => ({ ...prev, weather: "RAINY" }))
      return
    case "夜にする":
      showMessage("時計の針を夜になるまで回し続けた。")
      setStatus((prev) => ({ ...prev, weather: "NIGHT" }))
      return
    case "何もしない":
      showMessage(
        "本当に天気が変わってしまった時のことを考えたら、とてつもない恐怖だった。\n天気は神のみぞ知るのみ。"
      )
      return
  }
}

const TaimatsuBox: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "木箱がある。中には、たいまつが沢山入っている。",
    ["たいまつを点ける", "何もしない"],
    setFreeze,
    showMessage
  )
  switch (select) {
    case "たいまつを点ける":
      showMessage("たいまつを点けた。")
      setStatus((prev) => ({ ...prev, light: 16 }))
      return
    case "何もしない":
      showMessage("今は不要なので、何もしなかった。")
      return
  }
}

const SpawnPirania: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  encountMonster("pirania", showMessage, setFreeze, setMonster)
}
const SpawnDrone: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  encountMonster("drone", showMessage, setFreeze, setMonster)
}

const Leave: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "部屋から出ますか？",
    ["出る", "何もしない"],
    setFreeze,
    showMessage
  )
  switch (select) {
    case "出る":
      showMessage("プレーヤーは、不思議な部屋を出た。")
      setStatus((prev) => ({
        ...prev,
        map: "FrozenCity",
        position: { x: 3, y: 12 },
        direction: "E",
      }))
      return
    case "何もしない":
      showMessage("今は不要なので、何もしなかった。")
      return
  }
}

export const AdminRoom: MapType = {
  type: "INDOOR",
  light: false,
  size: 8,
  map: [
    "11111111",
    "1000000E",
    "101C110F",
    "10000001",
    "101B1101",
    "10101101",
    "1A000001",
    "1D111111",
  ],
  customWall: {
    B: <span>WEATHER＿CONTROLLER</span>,
    C: <span></span>,
    D: <Door />,
    E: <span>ピラニアと握手！</span>,
    F: <span>こんにちはドローンさん</span>,
  },
  events: {
    A: "薄暗く湿っぽい室内は、どこか不思議に感じるほど整然としていた。",
    B: WeatherController,
    C: TaimatsuBox,
    D: Leave,
    E: SpawnPirania,
    F: SpawnDrone,
  },
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    showMessage("プレーヤーは、吸い込まれるように入っていった。")
  },
}
