// 選択肢は最大4個まで
export const ask = (
  confirm: string,
  choices: string[],
  freezer: React.Dispatch<React.SetStateAction<boolean>>,
  showMessage: (msg: string) => void
) => {
  return new Promise<string>((resolve) => {
    freezer(true)
    let message = `${confirm}:`
    choices.map((v, i) => (message = `${message} \n${i + 1}: ${v}`))
    showMessage(message)
    const keyUpEvent = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
          document.removeEventListener("keyup", keyUpEvent)
          freezer(false)
          resolve(choices[parseInt(e.code.replace("Digit", "")) - 1])
          return
      }
    }

    const btns = document.getElementsByClassName("number-buttons")
    const btnsEvent = [
      () => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].removeEventListener("click", btnsEvent[i])
        }
        freezer(false)
        resolve(choices[0])
      },
      () => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].removeEventListener("click", btnsEvent[i])
        }
        freezer(false)
        resolve(choices[1])
      },
      () => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].removeEventListener("click", btnsEvent[i])
        }
        freezer(false)
        resolve(choices[2])
      },
      () => {
        for (let i = 0; i < btns.length; i++) {
          btns[i].removeEventListener("click", btnsEvent[i])
        }
        freezer(false)
        resolve(choices[3])
      },
    ]

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", btnsEvent[i])
    }

    document.addEventListener("keyup", keyUpEvent)
  })
}
