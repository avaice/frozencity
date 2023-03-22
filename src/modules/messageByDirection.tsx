import { ActionEvent, DirectionType } from "../types/type"

export const messageByDirection = (msg: string, direction: DirectionType) => {
  const e: ActionEvent = (status, setStatus, showMessage, setFreeze) => {
    if (status.direction === direction) {
      showMessage(msg)
    }
  }
  return e
}
