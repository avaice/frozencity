import { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { statusState, messageState, freezeState } from "../../recoilAtoms"
import { ItemType, Items } from "../../types/itemType"
import "./battle.css"

export const Battle = ({
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
    // return null
  }
  return (
    <div className="game-battle">
      <h2 className="game-battle-title">BATTLE</h2>
      <div>
        <p className="game-battle-status">
          Lv:{status.level} Health:{status.health}/{status.maxHealth} Magical:
          {status.magical}
        </p>
      </div>
      <div className="game-battle-main">
        <div className="game-battle-main-child left">
          <h3>Monster</h3>
          <img
            className={"game-battle-main-monster"}
            src="./images/monster.png"
          ></img>
          <button className="use">選択(Enter)</button>
        </div>

        <div className="game-battle-main-child right">
          <select
            ref={selectRef}
            className="game-battle-main-select"
            name="area"
            size={8}
            // onChange={(e) => {
            //   setSelecting(e.target.value as ItemType)
            // }}
            // onKeyUp={(e) => {
            //   if (e.code === "Enter" && selecting) {
            //     Items[selecting].action(
            //       status,
            //       setStatus,
            //       showMessage,
            //       setFreeze
            //     )
            //     setSelecting(undefined)
            //     setVisible(false)
            //     setFreeze(false)
            //   }
            // }}
          >
            {/* {status.items.map((v, i) => (
              <option key={`${v}-${i}`} value={`${v}`}>
                {Items[v].name}
              </option>
            ))} */}

            <optgroup label="通常攻撃">
              <option value="attack">殴る</option>
            </optgroup>
            <optgroup label="魔法">
              <option value="magical-1">冷気</option>
              <option value="magical-1">お祓い</option>
            </optgroup>
            <optgroup label="その他">
              <option value="magical-1">会話を試みる</option>
              <option value="magical-1">逃げる</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  )
}
