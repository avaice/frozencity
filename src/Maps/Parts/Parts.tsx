import { useRecoilState } from "recoil"
import { statusState } from "../../recoilAtoms"
import "./Parts.css"
export const Door = () => <div className="door"></div>
export const Toggle = () => {
  const [status] = useRecoilState(statusState)
  return (
    <div
      className="toggle"
      style={{
        backgroundColor: status.keys.engine
          ? "rgb(122, 227, 169)"
          : "rgb(227, 143, 122)",
      }}
    ></div>
  )
}
