import { SetterOrUpdater } from "recoil"
import { MagicList } from "../magicals"
import { AdminRoom } from "../Maps/AdminRoom"
import { EngineerRoom } from "../Maps/EngineerRoom"
import { FrozenCity } from "../Maps/FrozenCity"
import { Gesuido } from "../Maps/Gesuido"
import { Kajiya } from "../Maps/Kajiya"
import { MagicalZakkaRoom } from "../Maps/MagicalZakkaRoom"
import { MisororiRoom } from "../Maps/MisororiRoom"
import { MyRoom } from "../Maps/MyRoom"
import { ObasanRoom } from "../Maps/ObasanRoom"
import { Title } from "../Maps/Title"
import { Urayama } from "../Maps/Urayama"
import { BGMType } from "../modules/useBgm"
import { Monster } from "../Monsters/monsterUtils"
import { ItemType } from "./itemType"

export const maps = {
  MyRoom,
  FrozenCity,
  AdminRoom,
  MisororiRoom,
  Title,
  ObasanRoom,
  Kajiya,
  EngineerRoom,
  Urayama,
  Gesuido,
  MagicalZakkaRoom,
}

export type ActionEvent = (
  status: StatusType,
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
  showMessage: (msg: string) => void,
  setFreeze: React.Dispatch<React.SetStateAction<boolean>>,
  setBgm: React.Dispatch<React.SetStateAction<BGMType | undefined>>,
  setMonster: SetterOrUpdater<Monster | undefined>
) => void

export type DirectionType = "N" | "E" | "W" | "S"
export type PositionType = { x: number; y: number }
export type StatusType = {
  debug: boolean // デバッグが有効か
  map: keyof typeof maps
  position: PositionType // 位置
  direction: DirectionType // 方角
  exp: number // 経験値
  money: number // 資金
  health: number // 体力
  maxHealth: number // 最大体力
  magical: number // 魔力
  level: number // レベル
  light: number // たいまつの耐久歩数
  steps: number // 歩数
  weather: "DAY" | "RAINY" | "NIGHT" | "LIGHT" // 天気
  items: ItemType[]
  keys: {
    canMonsterSpawn: boolean // モンスターがスポーンするか
    engine: boolean // 町の稼動装置
    isShopOpened?: boolean // おばさんの商店が空いているか
    tutorial?: boolean
    misorori?: // みそロリと会話をした
    | "初めて再会"
      | "周りの調査完了"
      | "モンスター撃退イベントMSRR版"
      | "モンスター撃退イベントMSRR版_進行中"
      | "モンスター撃退イベントMSRR版_バトル中"
      | "料理開放"
    obasan?: "モンスター撃退イベント" | "モンスターから助けた"
    engineer?: "初対面イベント" | "エンジニア開放"
  }
  magicals: MagicList[]
  equipments: {
    sword: ItemType
    shield: ItemType
  }
}
