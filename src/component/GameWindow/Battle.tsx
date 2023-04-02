import { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { calcPower } from "../../calculator"
import { STATIC_GAME_SETTING } from "../../gameSettings"
import { magicals, MagicList } from "../../magicals"
import { useBgm } from "../../modules/useBgm"
import { withMargin } from "../../modules/withMargin"
import {
  statusState,
  messageState,
  monsterState,
  freezeState,
} from "../../recoilAtoms"
import { ItemType, Items } from "../../types/itemType"
import "./battle.css"

type BattleCommands = "attack" | "kaiwa" | "nigeru" | MagicList

export const Battle = ({ visible }: { visible: boolean }) => {
  const selectRef = useRef<HTMLSelectElement>(null)
  const [freeze, setFreeze] = useRecoilState(freezeState) // 入力を受け付けなくするか
  const { currentBgm, setBgm, isInitializedBgm, InitializeBgm } = useBgm()

  const [status, setStatus] = useRecoilState(statusState)
  const [message, showMessage] = useRecoilState(messageState)
  const [isMyTurn, setIsMyTurn] = useState(true)
  const [monster, setMonster] = useRecoilState(monsterState)

  const [selecting, setSelecting] = useState<BattleCommands | undefined>()
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus()
    }
    setSelecting(undefined)
  }, [visible])

  useEffect(() => {
    if (!monster) {
      setIsMyTurn(true)
    }
  }, [monster])

  useEffect(() => {
    if (isMyTurn && selectRef.current) {
      selectRef.current.focus()
    }
  }, [isMyTurn])

  const turn = async () => {
    if (!isMyTurn || !selecting) {
      return
    }
    if (!monster) {
      return alert(
        "ERROR: モンスターと戦っていない状態で攻撃イベントが呼び出されました。"
      )
    }

    const attack = () =>
      new Promise<number>((resolve) => {
        showMessage("プレーヤーの攻撃！")
        setTimeout(() => {
          const sword = Items[status.equipments.sword].equip
          const dmg = withMargin(
            calcPower(status.level) + (sword ? sword.power : 0),
            3
          )
          if (dmg === 0) {
            showMessage("攻撃は命中しなかった。")
          } else {
            setMonster((prev) => {
              if (!prev) {
                return undefined
              }
              return { ...prev, health: Math.max(0, prev.health - dmg) }
            })
            showMessage(`${monster.name}に${dmg}のダメージを与えた！`)
          }
          setTimeout(() => {
            resolve(dmg)
          }, 1000)
        }, 500)
      })

    const nigeru = () =>
      new Promise<boolean>((resolve) => {
        const exitNotAllowed =
          status.keys.obasan === "モンスター撃退イベント" ||
          status.keys.misorori === "モンスター撃退イベントMSRR版_進行中"
        showMessage("プレーヤーは逃亡を試みた！")
        setTimeout(() => {
          if (Math.random() > monster.escapeChance || exitNotAllowed) {
            showMessage("逃亡に失敗した！")
            resolve(false)
          } else {
            showMessage(`プレーヤーは${monster.name}から逃げた。`)
            setMonster(undefined)
            resolve(true)
          }
        }, 500)
      })
    const kaiwa = () =>
      new Promise<boolean>((resolve) => {
        showMessage(`プレーヤーは${monster.name}に話しかけた。`)
        setTimeout(() => {
          if (!monster.kaiwa) {
            showMessage(`${monster.name}には言葉が通じないようだ！`)
            setTimeout(() => {
              resolve(false)
            }, 500)
          } else {
            showMessage(`プレーヤーは${monster.name}と話し合って、和解した。`)
            setMonster(undefined)
            resolve(true)
          }
        }, 500)
      })
    setIsMyTurn(false)
    switch (selecting) {
      case "attack":
        const dmg = await attack()
        if (monster.health - dmg <= 0) {
          const getItem =
            monster.drop &&
            status.items.length < STATIC_GAME_SETTING.maxItem &&
            Math.random() < 0.65
          setStatus((prev) => ({
            ...prev,
            money: monster.money ? prev.money + monster.money : prev.money,
            exp: prev.exp + monster.exp,
            items: getItem
              ? [...prev.items, monster.drop as ItemType]
              : [...prev.items],
          }))
          showMessage(
            `${monster.name}を倒した！\n${monster.exp}経験値${
              monster.money ? `と${monster.money}G` : ""
            }${
              getItem ? `と${Items[monster.drop as ItemType].name}` : ""
            }を得た。`
          )
          setTimeout(() => {
            setMonster(undefined)
          }, 2000)
          return
        }
        break
      case "nigeru":
        if (await nigeru()) {
          return
        }
        break
      case "kaiwa":
        if (await kaiwa()) {
          return
        }
        break
    }

    showMessage(`${monster.name}の攻撃！`)
    setTimeout(async () => {
      const getDmg = await monster.attack(
        status,
        setStatus,
        showMessage,
        setFreeze,
        setBgm,
        setMonster
      )
      setTimeout(() => {
        if (status.health - getDmg <= 0) {
          showMessage(
            "プレーヤーは力尽きた...\n【GAME OVER】5秒後にタイトルへ戻ります..."
          )
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        } else {
          setIsMyTurn(true)
        }
      }, 1000)
    }, 500)
  }

  if (!visible) {
    return null
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
            src={
              monster ? `${process.env.PUBLIC_URL}/images/${monster.image}` : ""
            }
          ></img>
          <button className="use" onClick={() => turn()}>
            選択(Enter)
          </button>
        </div>

        <div className="game-battle-main-child right">
          <select
            ref={selectRef}
            className="game-battle-main-select"
            name="area"
            size={8}
            disabled={!isMyTurn}
            onChange={(e) => {
              setSelecting(e.target.value as BattleCommands)
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                turn()
              }
            }}
          >
            <optgroup label="通常攻撃">
              <option value="attack">殴る</option>
            </optgroup>
            <optgroup label="魔法">
              {status.magicals.map((v, i) => (
                <option key={`${v}-${i}`} value={`${v}`}>
                  {magicals[v].name}
                </option>
              ))}
            </optgroup>
            <optgroup label="その他">
              <option value="kaiwa">会話を試みる</option>
              <option value="nigeru">逃げる</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  )
}
