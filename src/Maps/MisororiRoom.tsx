import { misororiCooking } from "../Events/misororiCooking"
import { ask } from "../modules/ask"
import { MapType } from "../types/mapType"
import { ActionEvent, StatusType } from "../types/type"
import { Door } from "./Parts/Parts"

const GoToFrozenCity: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze
) => {
  const select = await ask(
    "外に出る？",
    ["出る", "何もしない"],
    setFreeze,
    showMessage
  )

  if (select === "出る") {
    showMessage("プレーヤーは、外に出た。")
    setStatus((prev) => ({
      ...prev,
      map: "FrozenCity",
      position: {
        x: 11,
        y: 3,
      },
      direction: "W",
    }))
  } else {
    showMessage("外に出るのが億劫なのは、昔と変わらないなと思った。")
  }
}

const MSRR: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  if (!status.keys.misorori) {
    setFreeze(true)

    const msgs = [
      "みそろり\n「おはよ・・・なんか外で機械の音がうるさいけど、どうしたの・・？」",
      "プレーヤーは、自分たちが冷凍保存されていたこと・ついさっき解凍されたばかりだということ・",
      "他の人たちも順に解凍されていくであろうことを話した。",
      "みそろり\n「ええ！！？なんで冷凍保存されてたの...？今は何年なの？みんなは元気なの！？」",
      "みそろり\n「ちょっと調査してきて！！！」",
    ]
    msgs.forEach((v, i) => {
      setTimeout(() => {
        showMessage(v)
        if (i === 4) {
          setFreeze(false)
        }
      }, 2500 * i)
    })

    setStatus((prev) => ({
      ...prev,
      keys: { ...prev.keys, misorori: "初めて再会" },
    }))

    return
  }

  switch (status.keys.misorori) {
    case "初めて再会":
      showMessage("みそろり「みんなのことが心配だよ。無事にしてるかな...？」")
      return
    case "周りの調査完了":
      setFreeze(true)
      setTimeout(() => {
        showMessage("みそろりに、おばさんをモンスターから助けたことを話した。")
        setTimeout(() => {
          showMessage(
            "みそろり「その人、私の家の裏にあるお店のおばさんだよ！！無事だったんだね、よかった」"
          )
          setTimeout(() => {
            showMessage(
              "みそろり「モンスターが出るんだったら武器を持っていた方がいいかもね...」"
            )
            setStatus((prev) => ({
              ...prev,
              keys: {
                ...prev.keys,
                isShopOpened: true,
                misorori: "モンスター撃退イベントMSRR版",
              },
            }))
            setFreeze(false)
          }, 1600)
        }, 2000)
      }, 1000)
      return
    case "料理開放":
      misororiCooking(
        status,
        setStatus,
        showMessage,
        setFreeze,
        setBgm,
        setMonster
      )
      return
    default:
      showMessage("留守中のようだ。")
  }
}

export const MisororiRoom: MapType = {
  type: "INDOOR",
  light: true,
  size: 4,
  map: ["1111", "1111", "10B1", "1A11"],
  customWall: {
    A: <Door />,
  },
  events: {
    B: MSRR,
    A: GoToFrozenCity,
  },
  stepEvent: (status, setStatus, showMessage, setFreeze, setBgm) => {},
  onEntered: (status, setStatus, showMessage, setFreeze, setBgm) => {
    showMessage("何度入っても慣れない家だとプレーヤーは思った。")
    setBgm("msrr")
  },
}
