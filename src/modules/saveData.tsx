import { StatusType } from "../types/type"

export const gameSave = (data: string) =>
  new Promise<boolean>((resolve) => {
    //ローカルに保存
    localStorage.setItem("frozen-city-save-data", data)

    if (localStorage.getItem("useCloudSave") === "yes") {
      const postBody = JSON.stringify({
        body: data,
        unique: localStorage.getItem("dataUniqueKey"),
      })
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
      fetch("http://localhost:3001/save", {
        method: "POST",
        headers,
        body: postBody,
      })
        .then((res) => res.text())
        .then((v) => {
          localStorage.setItem("dataUniqueKey", v)
          resolve(true)
        })
        .catch(() => {
          resolve(false)
        })
    } else {
      resolve(true)
    }
  })

export const gameLoad = () =>
  new Promise<StatusType | null>((resolve) => {
    const getLocalData = () => {
      const localdata = localStorage.getItem("frozen-city-save-data")
      if (localdata) {
        return resolve(JSON.parse(localdata))
      }
      resolve(null)
    }
    if (
      localStorage.getItem("useCloudSave") === "yes" &&
      localStorage.getItem("dataUniqueKey")
    ) {
      const postBody = JSON.stringify({
        unique: localStorage.getItem("dataUniqueKey"),
      })
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
      fetch("http://localhost:3001/load", {
        method: "POST",
        headers,
        body: postBody,
      })
        .then((res) => res.json())
        .then((v) => {
          resolve(v)
        })
        .catch(() => {
          alert(
            "セーブデータをサーバーから取得できませんでした。端末にバックアップされたデータで始めます。"
          )
          getLocalData()
        })
    } else {
      getLocalData()
    }
  })
