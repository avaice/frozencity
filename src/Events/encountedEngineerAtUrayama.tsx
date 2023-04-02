import { encountMonster } from "../Monsters/monsterUtils"
import { ActionEvent } from "../types/type"

export const MeetEngineerEvent: ActionEvent = (
  status,
  setStatus,
  showMessage,
  setFreeze,
  setBgm,
  setMonster
) => {
  setFreeze(true)
  setStatus((prev) => ({
    ...prev,
    keys: {
      ...prev.keys,
      engineer: "エンジニア開放",
    },
  }))
  showMessage(
    "裏山へ向かおうとした時、向かいから筋肉質のダンディなおじさんが向かってきた。"
  )
  setTimeout(() => {
    showMessage("おじさん「お、こんなところに人がいるのか。」")
    setTimeout(() => {
      showMessage(
        "おじさん「俺はNorth Cityから来たんだ。そっちの街も冷凍されていたのか？」"
      )
      setTimeout(() => {
        showMessage(
          "プレーヤーは、自分たちの街も冷凍されていたこと・モンスターが住み着いていて危険なことをおじさんに話した。"
        )
        setTimeout(() => {
          showMessage(
            "おじさん「俺のところは半年くらい前に急に解凍されたんだ。同じようにモンスターも住み着いていて大変だったが、しばらくの間はなんとかみんな暮らせてた。」"
          )
          setTimeout(() => {
            showMessage(
              "おじさん「でも、この前町の稼動エンジンが止まってみんなまた冷凍されちまった。おそらく電気だかガソリンだか知らんが、動力が無くなってしまったんだな」"
            )
            setTimeout(() => {
              showMessage(
                "おじさん「電気もガソリンも、今どうやって手に入れるのかは分からない。エンジンが止まったらもうどうしようもないんだ」"
              )
              setTimeout(() => {
                showMessage(
                  "おじさん「お前らのところは最近動き出したのか？あまりゆっくりしているなよ。エンジンが動いているうちに脱出策を考えるんだ。」"
                )
                setTimeout(() => {
                  showMessage(
                    "おじさん「とりあえず、帰る場所が無くなっちまったし、俺はこの街に少しだけ住ませてもらうよ。」"
                  )
                  setTimeout(() => {
                    showMessage(
                      "おじさん「俺のところに来てくれたら冒険の手伝いをしてやれるかもしれんな。いつでも来いよ。」"
                    )
                    setTimeout(() => {
                      showMessage("ENGINEERING SERVICESが使えるようになった。")
                      setFreeze(false)
                    }, 2000)
                  }, 3000)
                }, 3000)
              }, 3000)
            }, 5000)
          }, 4000)
        }, 4000)
      }, 4000)
    }, 2000)
  }, 2000)
}
