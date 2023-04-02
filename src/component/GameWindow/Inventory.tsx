import { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { ask } from "../../modules/ask"
import { deleteItem } from "../../modules/deleteItem"
import { useBgm } from "../../modules/useBgm"
import {
  statusState,
  messageState,
  freezeState,
  monsterState,
} from "../../recoilAtoms"
import { ItemType, Items } from "../../types/itemType"

export const Inventory = ({
  visible,
  setVisible,
  type,
}: {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  type: "use" | "sell"
}) => {
  const selectRef = useRef<HTMLSelectElement>(null)
  const [status, setStatus] = useRecoilState(statusState)
  const [message, showMessage] = useRecoilState(messageState)
  const [freeze, setFreeze] = useRecoilState(freezeState) // 入力を受け付けなくするか
  const [selectingEq, setSelectingEq] = useState(false) // 選択中のものが装備中のものか
  const { currentBgm, setBgm, isInitializedBgm, InitializeBgm, loadStatus } =
    useBgm()
  const [monster, setMonster] = useRecoilState(monsterState)

  const [selecting, setSelecting] = useState<ItemType | undefined | "leave">()
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
    setSelecting(undefined)
  }, [visible])

  const leave = () => {
    showMessage("ロボット店員「バイバイ」")
    setStatus((prev) => ({
      ...prev,
      position: { x: 10, y: 2 },
      direction: "N",
      map: "Gesuido",
    }))
    setFreeze(false)
  }

  const use = () => {
    if (selectingEq) {
      return
    }
    if (selecting && selecting !== "leave") {
      const eq = Items[selecting].equip
      if (eq) {
        deleteItem(selecting, status, setStatus)
        if (eq.type === "sword") {
          setStatus((prev) => ({
            ...prev,
            items: [...prev.items, prev.equipments.sword],
            equipments: { ...prev.equipments, sword: selecting },
          }))
        } else {
          setStatus((prev) => ({
            ...prev,
            items: [...prev.items, prev.equipments.shield],
            equipments: { ...prev.equipments, shield: selecting },
          }))
        }
        showMessage(`${Items[selecting].name}を装備した。`)
      }
      Items[selecting].action(
        status,
        setStatus,
        showMessage,
        setFreeze,
        setBgm,
        setMonster
      )
      setSelecting(undefined)
      setVisible(false)
      setFreeze(false)
    }
  }

  const sell = async () => {
    if (!selecting || selecting === "leave") {
      return
    }

    const result = await ask(
      `${Items[selecting].name}を売却しますか？\n買取金額: ${Items[selecting].resell}G`,
      ["売る", "やめておく"],
      setFreeze,
      showMessage
    )
    if (result === "やめておく") {
      return showMessage("もったいないので売るのをやめた。")
    }
    showMessage(
      `${Items[selecting].name}を売却した。\n買取金額: ${Items[selecting].resell}G`
    )
    deleteItem(selecting, status, setStatus)

    setStatus((prev) => ({
      ...prev,
      money: prev.money + (Items[selecting].resell ?? 0),
    }))
  }

  if (!visible) {
    return null
  }
  return (
    <div className="game-inventory">
      <h2 className="game-inventory-title">Inventory</h2>
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
              if (e.target.value.includes("eq_")) {
                setSelectingEq(true)
                setSelecting(e.target.value.replace("eq_", "") as ItemType)
              } else if (e.target.value === "leave") {
                setSelecting("leave")
              } else {
                setSelectingEq(false)
                setSelecting(e.target.value as ItemType)
              }
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                if (selecting === "leave") {
                  leave()
                }
                type === "use" ? use() : sell()
              }
            }}
          >
            {status.items.map((v, i) => (
              <option key={`${v}-${i}`} value={`${v}`}>
                {Items[v].name}
              </option>
            ))}
            <option value={`eq_${status.equipments.sword}`}>
              {Items[status.equipments.sword].name}(装備中)
            </option>
            <option value={`eq_${status.equipments.shield}`}>
              {Items[status.equipments.shield].name}(装備中)
            </option>
            {type === "sell" && (
              <optgroup label="コマンド">
                <option value="leave">店を出る</option>
              </optgroup>
            )}
          </select>
        </div>
        <div className="game-inventory-items-child right">
          <h3>
            {selecting
              ? selecting !== "leave"
                ? Items[selecting].name
                : "帰る"
              : "アイテムを選択してください:"}
            {selecting &&
              selecting !== "leave" &&
              Items[selecting].equip &&
              "(装備)"}
          </h3>
          <p className="desc">
            {selecting && selecting !== "leave" && Items[selecting].description}{" "}
          </p>
          {type === "use" && (
            <button
              className="use"
              onClick={() => use()}
              disabled={selectingEq}
            >
              {selecting && selecting !== "leave" && Items[selecting].equip
                ? "装備"
                : "使う"}
              (Enter)
            </button>
          )}
          {type === "sell" && selecting !== "leave" ? (
            <button
              className="use"
              onClick={() => sell()}
              disabled={
                selectingEq ||
                !selecting ||
                Items[selecting].resell === undefined
              }
            >
              売る(Enter)
            </button>
          ) : (
            selecting === "leave" && (
              <button
                className="use"
                onClick={() => {
                  leave()
                }}
              >
                確定(Enter)
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
