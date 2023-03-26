import { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { deleteItem } from "../../modules/deleteItem"
import { statusState, messageState, freezeState } from "../../recoilAtoms"
import { ItemType, Items } from "../../types/itemType"

export const Inventory = ({
  visible,
  setVisible,
}: {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const selectRef = useRef<HTMLSelectElement>(null)
  const [status, setStatus] = useRecoilState(statusState)
  const [message, showMessage] = useRecoilState(messageState)
  const [freeze, setFreeze] = useRecoilState(freezeState) // 入力を受け付けなくするか
  const [selectingEq, setSelectingEq] = useState(false) // 選択中のものが装備中のものか

  const [selecting, setSelecting] = useState<ItemType | undefined>()
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
    setSelecting(undefined)
  }, [visible])

  const use = () => {
    if (selectingEq) {
      return
    }
    if (selecting) {
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
      Items[selecting].action(status, setStatus, showMessage, setFreeze)
      setSelecting(undefined)
      setVisible(false)
      setFreeze(false)
    }
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
              } else {
                setSelectingEq(false)
                setSelecting(e.target.value as ItemType)
              }
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                use()
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
          </select>
        </div>
        <div className="game-inventory-items-child right">
          <h3>
            {selecting ? Items[selecting].name : "アイテムを選択してください:"}
            {selecting && Items[selecting].equip && "(装備)"}
          </h3>
          <p className="desc">{selecting && Items[selecting].description} </p>
          <button className="use" onClick={() => use()} disabled={selectingEq}>
            {selecting && Items[selecting].equip ? "装備" : "使う"}(Enter)
          </button>
        </div>
      </div>
    </div>
  )
}
