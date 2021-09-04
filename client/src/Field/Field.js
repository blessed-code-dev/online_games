import {useEffect, useRef, useState} from "react";

const Field = (props) => {
    const canvasRef = useRef()
    useEffect(() => {
        //console.log('usingEffect ', props.res)
        let index = -1
        const canvas = canvasRef.current
        canvas.width = 600
        canvas.height = 600
        const width = canvas.width;
        const height = canvas.height;
        const ctx = canvas.getContext('2d')
        // ctx.clearRect(0, 0, width, height)
        // ctx.fillStyle = "rgba(0, 0, 0, 1)"
        // ctx.fillRect(0, 0, width, height)
        ctx.beginPath();
        ctx.moveTo(width / 3, 0)
        ctx.lineTo(width / 3, height)
        ctx.moveTo(2 * width / 3, 0)
        ctx.lineTo(2 * width / 3, height)
        ctx.moveTo(0, height / 3)
        ctx.lineTo(width, height / 3)
        ctx.moveTo(0, 2 * height / 3)
        ctx.lineTo(width, 2 * height / 3)
        ctx.shadowBlur = 10
        ctx.shadowColor = 'red'
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.closePath()
        ctx.stroke()


        props.state.forEach(((value, index) => {
            // //console.log('123')
            // //console.log(value, index);
            if (value === 'x') {
                drawX(index)
            }
            if (value === 'o') {
                drawO(index)
            }

            if (value === '?') {
                const x = (index) % 3
                const y = Math.trunc(index / 3)
                ctx.beginPath()
                // ctx.fillStyle = `rgba(2, 238, 26, 0.3)`
                // ctx.arc(x * width / 3 + width / 6, y * height / 3 + height / 6, width / 8, 0, Math.PI * 2)
                ctx.fillStyle = `rgb(255, 14, 14, 0.3)`
                ctx.fillRect(x * width / 3 + 20, y * height / 3 + 20, width / 3 - 40, height / 3 - 40)
                ctx.closePath()
                ctx.stroke()
            }

        }))

        if (props.res !== 0) {
            if (props.res[0] !== -1) {
                    const startX = props.res[0] % 3
                    const startY = Math.trunc(props.res[0] / 3)
                    const endX = props.res[1] % 3
                    const endY = Math.trunc(props.res[1] / 3)
                    ctx.beginPath();
                    ctx.moveTo((props.res[0] % 3) * width / 3 + width / 6 - (endX - startX) * 30, Math.trunc(props.res[0] / 3) * width / 3 + width / 6 - (endY - startY) * 30)
                    ctx.lineTo((props.res[1]% 3) * width / 3 + width / 6 + (endX - startX) * 30, Math.trunc(props.res[1] / 3) * width / 3 + width / 6 + (endY - startY) * 30)
                    ctx.lineWidth = 15
                    ctx.closePath()
                    ctx.stroke()
                    //console.log('тут линия от ' + props.res[0] + 'до' +props.res[1])
            }
        }
        if (props.myTurn) {
            //console.log('ADDING')
            canvas.addEventListener('pointermove', move, false)
            canvas.addEventListener('mouseout', mouseOut, false)
            canvas.addEventListener('click', click, false)
        }

        function move(ev) {
            const X = getMousePos(canvas, ev).x
            const Y = getMousePos(canvas, ev).y
            const indexX = Math.trunc(X / width * 3)
            const indexY = Math.trunc(Y / height * 3)
            const newIndex = indexY * 3 + indexX


            if (props.state[newIndex] === '') {
                removeListeners()
                props.onSelect(newIndex)
            } else if ((props.state.includes('?')) && ((props.state[newIndex] === 'x') || (props.state[newIndex] === 'o'))) {
                removeListeners()
                props.unpickAll()
            }


            // if (index !== indexY * 3 + indexX) {
            //     // //console.log('it is')
            //     if (state[indexY * 3 + indexX] === '') {
            //         index = indexY * 3 + indexX
            //         //console.log('init from move')

            //     } else index = -10
            //     // //console.log(state)
            // }


        }

        function mouseOut() {
            //console.log('init when out')
            removeListeners()
            props.unpickAll()
        }

        function click(ev) {
            const X = getMousePos(canvas, ev).x
            const Y = getMousePos(canvas, ev).y
            const indexX = Math.trunc(X / width * 3)
            const indexY = Math.trunc(Y / height * 3)
            const newIndex = indexY * 3 + indexX
            // //console.log(index, state[index])
            if ((props.state[newIndex] === '?')||(props.state[newIndex] === '')) {
                removeListeners()
                props.onPick(newIndex)
            }
        }


        function removeListeners() {
            //console.log('REMOVING')
            canvas.removeEventListener('pointermove', move, false)
            canvas.removeEventListener('mouseout', mouseOut, false)
            canvas.removeEventListener('click', click, false)
        }

        function drawX(index) {
            const x = (index) % 3
            const y = Math.trunc(index / 3)
            ctx.beginPath();
            ctx.moveTo(width / 3 * x + 30, height / 3 * y + 30)
            ctx.lineTo(width / 3 * x + width / 3 - 30, height / 3 * y + height / 3 - 30)
            ctx.moveTo(width / 3 * x + width / 3 - 30, height / 3 * y + 30)
            ctx.lineTo(width / 3 * x + 30, height / 3 * y + height / 3 - 30)
            ctx.closePath()
            ctx.stroke()
        }

        function drawO(index) {
            const x = (index) % 3
            const y = Math.trunc(index / 3)
            ctx.beginPath()
            ctx.arc(x * width / 3 + width / 6, y * height / 3 + height / 6, width / 8, 0, Math.PI * 2)
            ctx.closePath()
            ctx.stroke()
        }

        function getMousePos(canvas, evt) {
            let rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

    }, [props])


    return (
        <canvas ref={canvasRef}>

        </canvas>
    )
}


export default Field