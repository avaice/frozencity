import { ask } from "../modules/ask"
import { deleteItem } from "../modules/deleteItem"
import { Items, ItemType } from "../types/itemType"
import { ActionEvent } from "../types/type"

export const misororiCooking: ActionEvent = async (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  if (
    (await ask(
      "みそろり「やっほ〜、お腹すいたの？」",
      ["すいた", "あんまり"],
      setFreeze,
      showMessage
    )) === "あんまり"
  ) {
    return showMessage("みそろり「そっか〜」")
  }
  setFreeze(true)

  const recipe: ItemType[][] = [
    ["Beef", "BeefMisoSoup"],
    ["Unagi", "UnagiMisoSoup"],
    ["Chocolate", "ChocolateMisoSoup"],
  ]

  const choice = recipe.find(
    (v) => status.items.findIndex((_v) => _v === v[0]) !== -1
  )

  if (!choice) {
    showMessage("みそろり「材料が足りないよ〜」")
    return
  }

  if (
    (await ask(
      `みそろり「${Items[choice[1]].name}とかどう？」`,
      ["作ってもらう", "やめておく"],
      setFreeze,
      showMessage
    )) === "やめておく"
  ) {
    return showMessage("みそろり「そっか〜」")
  }
  setFreeze(true)

  deleteItem(
    choice[0],
    { ...status, items: [...status.items, choice[1]] },
    setStatus
  )
  showMessage("みそろり「どうぞ！」")

  setTimeout(() => {
    showMessage(
      `みそろりに${Items[choice[0]].name}を渡して${
        Items[choice[1]].name
      }を作ってもらった。`
    )
    setFreeze(false)
  }, 1000)
}
