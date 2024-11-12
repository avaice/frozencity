import { useEffect, useRef } from "react"
import { PositionType } from "../../types/type"
import { MapType } from "../../types/mapType"

type Props = {
    map:MapType
    position: PositionType
    size: number
}

export const MiniMap = ({map, position, size} : Props) => {

    // ['1111', '1C11', '10B1', '1A11'] のような形式のマップデータを受け取り、0は通路、それ以外は壁として描画する。自分の位置も表示する。
    // canvas に size px 以内で描画する

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const mapArray = map.map

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return

        const ctx = canvas.getContext('2d')
        if(!ctx) return

        const tileSize = size / mapArray.length

        ctx.clearRect(0, 0, size, size)

        mapArray.forEach((row, y) => {
            row.split('').forEach((cell, x) => {
                console.log(Object.keys(map.customWall))
                if(cell === '1' || Object.keys(map.customWall).includes(cell)){
                    ctx.fillStyle = "transparent"
                }else{
                    ctx.fillStyle = "gray"
                }
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
            })
        })

        ctx.fillStyle = 'red'
        ctx.fillRect(position.x * tileSize, position.y * tileSize, tileSize, tileSize)

    }, [map, position, size])

    return <canvas ref={canvasRef} width={size} height={size} className="mini-map" />
}