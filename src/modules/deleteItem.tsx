import { ItemType } from "../types/itemType"
import { StatusType } from "../types/type"

export const deleteItem = (
  item: ItemType,
  status: StatusType,
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>
) => {
  const newItem = [...status.items]
  newItem.splice(newItem.indexOf(item), 1)
  setStatus((prev) => ({
    ...prev,
    items: newItem,
  }))
}
