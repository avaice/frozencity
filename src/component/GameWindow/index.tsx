import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import {
  freezeState,
  inventoryVisibleState,
  messageState,
  monsterState,
  statusState,
} from "../../recoilAtoms"
import { Items, ItemType } from "../../types/itemType"
import { MapType } from "../../types/mapType"
import { Battle } from "./Battle"
import "./gameWindow.css"
import { Inventory } from "./Inventory"
import { Shop } from "./Shop"

export const GameWindow = ({
  mapData,
  windowRef,
}: {
  mapData: MapType
  windowRef?: React.Ref<HTMLDivElement>
}) => {
  const [isVisibleInventory, setIsVisibleInventory] = useRecoilState(
    inventoryVisibleState
  )
  const [status] = useRecoilState(statusState)
  const position = status.position
  const direction = status.direction
  const map = mapData.map
  const [monster] = useRecoilState(monsterState)

  const getAround = () => {
    const posY = (n: number) =>
      position.y + n * (direction === "S" || direction === "W" ? -1 : 1)
    const posX = (n: number) =>
      position.x + n * (direction === "S" || direction === "W" ? -1 : 1)
    const isWithinRange = (n: number) => n >= 0 && map.length > n
    if (direction === "N" || direction === "S") {
      return {
        c1: isWithinRange(posY(-1)) ? map[posY(-1)][position.x] : "1",
        c2: isWithinRange(posY(-2)) ? map[posY(-2)][position.x] : "1",
        c3: isWithinRange(posY(-3)) ? map[posY(-3)][position.x] : "1",
        l1: isWithinRange(posX(-1)) ? map[position.y][posX(-1)] : "1",
        l2:
          isWithinRange(posY(-1)) && isWithinRange(posX(-1))
            ? map[posY(-1)][posX(-1)]
            : "1",
        l3:
          isWithinRange(posY(-2)) && isWithinRange(posX(-1))
            ? map[posY(-2)][posX(-1)]
            : "1",
        l4:
          isWithinRange(posY(-3)) && isWithinRange(posX(-1))
            ? map[posY(-3)][posX(-1)]
            : "1",
        r1: isWithinRange(posX(1)) ? map[position.y][posX(1)] : "1",
        r2:
          isWithinRange(posY(-1)) && isWithinRange(posX(1))
            ? map[posY(-1)][posX(1)]
            : "1",
        r3:
          isWithinRange(posY(-2)) && isWithinRange(posX(1))
            ? map[posY(-2)][posX(1)]
            : "1",
        r4:
          isWithinRange(posY(-3)) && isWithinRange(posX(1))
            ? map[posY(-3)][posX(1)]
            : "1",
      }
    } else {
      return {
        c1: isWithinRange(posX(1)) ? map[position.y][posX(1)] : "1",
        c2: isWithinRange(posX(2)) ? map[position.y][posX(2)] : "1",
        c3: isWithinRange(posX(3)) ? map[position.y][posX(3)] : "1",
        l1: isWithinRange(posY(-1)) ? map[posY(-1)][position.x] : "1",
        l2:
          isWithinRange(posY(-1)) && isWithinRange(posX(1))
            ? map[posY(-1)][posX(1)]
            : "1",
        l3:
          isWithinRange(posY(-1)) && isWithinRange(posX(2))
            ? map[posY(-1)][posX(2)]
            : "1",
        l4:
          isWithinRange(posY(-1)) && isWithinRange(posX(3))
            ? map[posY(-1)][posX(3)]
            : "1",
        r1: isWithinRange(posY(1)) ? map[posY(1)][position.x] : "1",
        r2:
          isWithinRange(posY(1)) && isWithinRange(posX(1))
            ? map[posY(1)][posX(1)]
            : "1",
        r3:
          isWithinRange(posY(1)) && isWithinRange(posX(2))
            ? map[posY(1)][posX(2)]
            : "1",
        r4:
          isWithinRange(posY(1)) && isWithinRange(posX(3))
            ? map[posY(1)][posX(3)]
            : "1",
      }
    }
  }
  const around = getAround()

  return (
    <div className="game-window-wrapper" ref={windowRef}>
      <div className="game-window">
        <div
          className={`wall l-d1${
            around.l1 === "1" || (mapData.customWall as any)[around.l1]
              ? ""
              : around.l2 !== "1" && !(mapData.customWall as any)[around.l2]
              ? " hide"
              : "-open"
          }`}
        >
          {(mapData.customWall as any)[around.l1]}
        </div>
        <div
          className={`wall l-d2${
            around.l2 === "1" || (mapData.customWall as any)[around.l2]
              ? ""
              : around.l3 !== "1" && !(mapData.customWall as any)[around.l3]
              ? " hide"
              : "-open"
          }`}
        >
          {" "}
          {(mapData.customWall as any)[around.l2]}
        </div>
        <div
          className={`wall l-d3${
            around.l3 === "1" || (mapData.customWall as any)[around.l3]
              ? ""
              : around.l4 !== "1" && !(mapData.customWall as any)[around.l4]
              ? " hide"
              : "-open"
          }`}
        >
          {" "}
          {(mapData.customWall as any)[around.l3]}
        </div>
        <div
          className={`wall r-d1${
            around.r1 === "1" || (mapData.customWall as any)[around.r1]
              ? ""
              : around.r2 !== "1" && !(mapData.customWall as any)[around.r2]
              ? " hide"
              : "-open"
          }`}
        >
          {" "}
          {(mapData.customWall as any)[around.r1]}
        </div>
        <div
          className={`wall r-d2${
            around.r2 === "1" || (mapData.customWall as any)[around.r2]
              ? ""
              : around.r3 !== "1" && !(mapData.customWall as any)[around.r3]
              ? " hide"
              : "-open"
          }`}
        >
          {" "}
          {(mapData.customWall as any)[around.r2]}
        </div>
        <div
          className={`wall r-d3${
            around.r3 === "1" || (mapData.customWall as any)[around.r3]
              ? ""
              : around.r4 !== "1" && !(mapData.customWall as any)[around.r4]
              ? " hide"
              : "-open"
          }`}
        >
          {" "}
          {(mapData.customWall as any)[around.r3]}
        </div>
        {(around.c1 === "1" || (mapData.customWall as any)[around.c1]) && (
          <div className="wall c-d1">
            {" "}
            {(mapData.customWall as any)[around.c1]}
          </div>
        )}
        {(around.c2 === "1" || (mapData.customWall as any)[around.c2]) && (
          <div className="wall c-d2">
            {" "}
            {(mapData.customWall as any)[around.c2]}
          </div>
        )}
        {(around.c3 === "1" || (mapData.customWall as any)[around.c3]) && (
          <div className="wall c-d3">
            {" "}
            {(mapData.customWall as any)[around.c3]}
          </div>
        )}
      </div>
      <div className="game-status">
        {/* <p>{status.map}</p> */}
        <p>Esc: Inventory</p>
        <p>
          x= {position.x} y= {position.y}
        </p>
      </div>

      <Inventory
        visible={isVisibleInventory || status.map === "RecycleShop"}
        setVisible={setIsVisibleInventory}
        type={status.map === "RecycleShop" ? "sell" : "use"}
      />

      <Shop
        visible={
          status.map === "ObasanRoom" ||
          status.map === "Kajiya" ||
          status.map === "MagicalZakkaRoom"
        }
      />

      <Battle visible={!!monster} />
    </div>
  )
}
