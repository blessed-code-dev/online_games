import {useEffect, useRef, useState} from "react";
import {logDOM} from "@testing-library/react";

export default (props) => {

    const [value, setValue] = useState(0);

    const canvasRef = useRef()
    useEffect(() => {
        props.onMount([value, setValue]);
        console.log('using effect1',value)

        const cellSize = props.cellSize
        const canvas = canvasRef.current
        canvas.width = cellSize * 10 + 10
        canvas.height = cellSize * 20 + 10
        const ctx = canvas.getContext('2d')



        for (let i = 0; i <= 20; i+=1) {
            ctx.beginPath()
            ctx.moveTo(0, i * cellSize)
            ctx.lineTo(canvas.width - 10, i * cellSize)
            // ctx.shadowBlur = 10
            // ctx.shadowColor = 'red'
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 1
            ctx.closePath()
            ctx.stroke()
        }

        for (let i = 0; i <= 10; i+=1) {
            ctx.beginPath()
            ctx.moveTo(i * cellSize, 0)
            ctx.lineTo(i * cellSize, canvas.height - 10)
            // ctx.shadowBlur = 10
            // ctx.shadowColor = 'red'
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 1
            ctx.closePath()
            ctx.stroke()
        }
        if (value[0])
            value.map((value, row) => {
                value.map((value1, col) => {
                    if ((value1)) {
                        // console.log(col, row)
                        ctx.beginPath()
                        ctx.fillStyle = `rgb(255, 14, 14, 0.3)`
                        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
                        ctx.closePath()
                        ctx.stroke()

                    }
                })
            })

    })


    return (<canvas ref={canvasRef}>

    </canvas>)
}


// import {useEffect, useRef, useState} from "react";
// import {logDOM} from "@testing-library/react";
//
// export default (props) => {
//
//     const [value, setValue] = useState(0);
//
//     const canvasRef = useRef()
//     useEffect(() => {
//         console.log('using effect',value)
//         props.onMount([value, setValue]);
//
//         const cellSize = props.cellSize
//         const canvas = canvasRef.current
//         canvas.width = cellSize * 10 + 10
//         canvas.height = cellSize * 20 + 10
//         const ctx = canvas.getContext('2d')
//
//
//         // setTimeout(()=>{
//         //     props.state='qwertt'
//         //     console.log('changed')
//         // },2000)
//
//
//         for (let i = 0; i <= 20; i++) {
//             ctx.beginPath()
//             ctx.moveTo(0, i * cellSize)
//             ctx.lineTo(canvas.width - 10, i * cellSize)
//             // ctx.shadowBlur = 10
//             // ctx.shadowColor = 'red'
//             ctx.strokeStyle = '#ffffff'
//             ctx.lineWidth = 1
//             ctx.closePath()
//             ctx.stroke()
//         }
//
//         for (let i = 0; i <= 10; i++) {
//             ctx.beginPath()
//             ctx.moveTo(i * cellSize, 0)
//             ctx.lineTo(i * cellSize, canvas.height - 10)
//             // ctx.shadowBlur = 10
//             // ctx.shadowColor = 'red'
//             ctx.strokeStyle = '#ffffff'
//             ctx.lineWidth = 1
//             ctx.closePath()
//             ctx.stroke()
//         }
//         console.log(value)
//         value.map((value, index) => {
//             value.map((value1, index1) => {
//                 if (value1 === 'x'){
//                     console.log(index1, index)
//                 ctx.beginPath()
//                 ctx.fillStyle = `rgb(255, 14, 14, 0.3)`
//                 ctx.fillRect(index1*cellSize,index*cellSize,cellSize,cellSize)
//                 ctx.closePath()
//                 ctx.stroke()}
//             })
//         })
//
//
//
//
//
//     }, )
//
//
//     return (<canvas ref={canvasRef}>
//
//     </canvas>)
// }