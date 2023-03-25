import { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
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

  const [selecting, setSelecting] = useState<ItemType | undefined>()
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
    setSelecting(undefined)
  }, [visible])

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
              setSelecting(e.target.value as ItemType)
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter" && selecting) {
                Items[selecting].action(
                  status,
                  setStatus,
                  showMessage,
                  setFreeze
                )
                setSelecting(undefined)
                setVisible(false)
                setFreeze(false)
              }
            }}
          >
            {status.items.map((v, i) => (
              <option key={`${v}-${i}`} value={`${v}`}>
                {Items[v].name}
              </option>
            ))}
          </select>
        </div>
        <div className="game-inventory-items-child right">
          <h3>
            {selecting ? Items[selecting].name : "アイテムを選択してください:"}
          </h3>
          <p className="desc">{selecting && Items[selecting].description} </p>
          <button className="use">使う(Enter)</button>
        </div>
      </div>
    </div>
  )
}
