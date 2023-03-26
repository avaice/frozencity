import { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { STATIC_GAME_SETTING } from "../../gameSettings"
import { Unagi } from "../../items/unagi"
import { ask } from "../../modules/ask"
import { statusState, messageState, freezeState } from "../../recoilAtoms"
import { ItemType, Items } from "../../types/itemType"
import { ActionEvent, StatusType } from "../../types/type"

type ShopItem = {
  item: ItemType
  price: number
}

type ShopType = {
  items: ShopItem[]
  message: {
    buyAfter: string
    thanks: string
  }
  onExit: (
    status: StatusType,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>
  ) => void
}

const obasanShop: ShopType = {
  items: [
    { item: "Chocolate", price: 2 },
    { item: "Unagi", price: 25 },
    { item: "Taimatsu", price: 5 },
    { item: "Menbou", price: 15 },
  ],
  message: {
    buyAfter: "おばさん「まだ見るかい？」",
    thanks: "おばさん「ありがとうね。」",
  },
  onExit: (_status, setStatus) => {
    setStatus((prev) => ({
      ...prev,
      map: "FrozenCity",
      position: {
        x: 14,
        y: 3,
      },
      direction: "W",
    }))
  },
}

const kajiyaShop: ShopType = {
  items: [
    { item: "Taimatsu", price: 7 },
    { item: "Knife", price: 50 },
    { item: "Axe", price: 500 },
    { item: "TogeSword", price: 950 },
    { item: "Besuto", price: 40 },
  ],
  message: {
    buyAfter: "老人「他に欲しいものはあるか？」",
    thanks: "老人「じゃあな。」",
  },
  onExit: (_status, setStatus) => {
    setStatus((prev) => ({
      ...prev,
      map: "FrozenCity",
      position: {
        x: 5,
        y: 7,
      },
      direction: "S",
    }))
  },
}

const bugShop: ShopType = {
  items: [{ item: "Debugger", price: 0 }],
  message: {
    buyAfter:
      "誰もいない不思議な店内から、どこからともなく感謝の声が聞こえた。",
    thanks:
      "不思議な雰囲気を醸し出す店内から、プレーヤーは逃げるように出ていった。",
  },
  onExit: (_status, setStatus) => {
    setStatus((prev) => ({
      ...prev,
      map: "FrozenCity",
      position: {
        x: 5,
        y: 7,
      },
      direction: "S",
    }))
  },
}

export const Shop = ({ visible }: { visible: boolean }) => {
  const selectRef = useRef<HTMLSelectElement>(null)
  const [status, setStatus] = useRecoilState(statusState)
  const [message, showMessage] = useRecoilState(messageState)
  const [freeze, setFreeze] = useRecoilState(freezeState) // 入力を受け付けなくするか
  const [buyFreeze, setBuyFreeze] = useState(false) // 入力を受け付けなくするか

  const [selecting, setSelecting] = useState<ShopItem | "leave" | undefined>()
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
    setSelecting(undefined)
  }, [visible])

  useEffect(() => {
    if (visible) {
      setFreeze(true)
    } else {
      setFreeze(false)
    }
  }, [visible, setFreeze])

  useEffect(() => {
    if (!buyFreeze && selectRef.current) {
      selectRef.current.focus()
    }
  }, [buyFreeze])

  if (!visible) {
    return null
  }

  const getShop = (): ShopType => {
    switch (status.map) {
      case "ObasanRoom":
        return obasanShop
      case "Kajiya":
        return kajiyaShop
      default:
        return bugShop
    }
  }

  const buy = () => {
    const leave = () => {
      showMessage(getShop().message.thanks)
      getShop().onExit(status, setStatus)
      setBuyFreeze(false)
      return
    }
    if (!selecting) {
      return
    }
    if (selecting === "leave") {
      leave()
      return
    }
    if (selecting.price > status.money) {
      showMessage(
        `${Items[selecting.item].name}を買うには資金が${
          selecting.price - status.money
        }G足りない。`
      )
      return
    }
    if (STATIC_GAME_SETTING.maxItem <= status.items.length) {
      showMessage("荷物がいっぱいで購入できない。")
      return
    }

    setBuyFreeze(true)
    setStatus((prev) => ({
      ...prev,
      items: [...prev.items, selecting.item],
      money: prev.money - selecting.price,
    }))
    showMessage(`${Items[selecting.item].name}を購入した。`)
    setTimeout(async () => {
      const a = await ask(
        getShop().message.buyAfter,
        ["まだ買い物する", "外に出る"],
        setFreeze,
        showMessage
      )
      if (a === "外に出る") {
        leave()
        return
      }
      setBuyFreeze(false)
      showMessage("プレーヤーは、もう少し店内を見てみることにした。")
    }, 500)
  }

  return (
    <div className="game-inventory">
      <h2 className="game-inventory-title">Shop</h2>
      <div>
        <p className="game-inventory-status">
          Lv:{status.level} Health:{status.health}/{status.maxHealth} Magical:
          {status.magical} Money:{status.money}G
        </p>
      </div>
      <div className="game-inventory-items">
        <div className="game-inventory-items-child left">
          <select
            ref={selectRef}
            className="game-inventory-items-select"
            name="area"
            size={8}
            onChange={(e) => {
              if (e.target.value === "leave") {
                setSelecting("leave")
                return
              }
              setSelecting(
                getShop().items.find(
                  (v) => v.item === (e.target.value as ItemType)
                )
              )
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                buy()
              }
            }}
            disabled={buyFreeze}
          >
            <optgroup label="商品">
              {getShop().items.map((v, i) => (
                <option key={`${v.item}-${i}`} value={`${v.item}`}>
                  {Items[v.item].name}({v.price}G)
                </option>
              ))}
            </optgroup>
            <optgroup label="コマンド">
              <option value={`leave`}>店を出る</option>
            </optgroup>
          </select>
        </div>
        <div className="game-inventory-items-child right">
          <h3>
            {selecting
              ? selecting === "leave"
                ? "店を出る"
                : Items[selecting.item].name
              : "アイテムを選択してください:"}
          </h3>
          <p className="desc">
            {selecting &&
              (selecting === "leave"
                ? "買い物を終えて、店を出る"
                : Items[selecting.item].description)}
          </p>
          <button className="use" onClick={() => buy()} disabled={buyFreeze}>
            {selecting === "leave" ? "決定" : "購入"}(Enter)
          </button>
        </div>
      </div>
    </div>
  )
}
