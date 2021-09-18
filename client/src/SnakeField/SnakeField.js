import {useEffect, useRef, useState} from "react";

export default (props) => {

    const [value, setValue] = useState(0);

    const canvasRef = useRef()
    useEffect(async () => {
        props.onMount([value, setValue]);

        const cellSize = props.cellSize
        const canvas = canvasRef.current
        canvas.width = cellSize * 30 + 10
        canvas.height = cellSize * 20 + 10
        const ctx = canvas.getContext('2d')


        for (let i = 0; i <= 20; i += 20) {
            ctx.beginPath()
            ctx.moveTo(0, i * cellSize)
            ctx.lineTo(canvas.width - 10, i * cellSize)
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 1
            ctx.closePath()
            ctx.stroke()
        }

        for (let i = 0; i <= 30; i += 30) {
            ctx.beginPath()
            ctx.moveTo(i * cellSize, 0)
            ctx.lineTo(i * cellSize, canvas.height - 10)
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 1
            ctx.closePath()
            ctx.stroke()
        }

        if (value[0])
            value.forEach((value, row) => {
                value.forEach((value1, col) => {
                    if ((value1)) {
                        if (value1 === 1) {
                            ctx.beginPath()
                            ctx.fillStyle = `rgb(158, 158, 158)`
                            ctx.shadowColor = `rgb(158, 158, 158)`;
                            ctx.shadowBlur = 15;
                            ctx.fillRect(col * cellSize-1, row * cellSize-1, cellSize+2, cellSize+2)
                            ctx.closePath()
                            ctx.stroke()
                        } else if (value1 === -1) {
                            ctx.beginPath()
                            ctx.fillStyle = `rgb(255, 255, 255)`
                            ctx.shadowBlur = 15
                            ctx.shadowColor = 'white';
                            ctx.arc((col+0.5) * cellSize, (row+0.5) * cellSize,cellSize/2,0,2*Math.PI)
                            ctx.closePath()
                            ctx.fill()
                            ctx.stroke()

                        } else {
                            ctx.beginPath()
                            ctx.fillStyle = `rgb(255, 255, 255)`
                            ctx.shadowColor = 'white';
                            ctx.shadowBlur = 15;
                            ctx.fillRect(col * cellSize-1, row * cellSize-1, cellSize+2, cellSize+2)
                            ctx.closePath()
                            ctx.stroke()
                        }
                    }
                })
            })

    })


    return (<canvas ref={canvasRef}>

    </canvas>)
}
