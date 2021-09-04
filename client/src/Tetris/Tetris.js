import React, { useRef, useState} from "react";
import "./Tetris.css"
import TetrisField from "../TetrisField/TetrisField";
import {Transition} from "react-transition-group";

export default (props) => {
    const [toggle, setToggle] = useState(true)
    const [temp, rerender] = useState(true) //using this state only to rerender component
    const gameOver = useRef(false)
    const scoreTable = useRef()

    let value = null;
    let setValue = null;
    let arr = []
    let running = true
    let currentFigure = 0
    let figurePos = {
        x: 0,
        y: 0,
        angle: 0,
        reset: function () {
            this.x = 0
            this.y = 0
        }
    }
    let childRendered = true


    const onChildMount = (dataFromChild) => {
        childRendered = true
        value = dataFromChild[0];
        setValue = (value) => {
            childRendered = false
            dataFromChild[1](value)
        };

        if (!value) {
            for (let row = -2; row < 20; row++) {
                arr[row] = [];
                for (let col = 0; col < 10; col++) {
                    arr[row][col] = 0;
                }
            }
            console.log('%c123', 'color:yellow');
            setValue(arr)
        }
    };


    const loopId = setInterval(() => {
        if (!gameOver.current) {
            running = true
            console.log('%cbegin tick                   ', 'background: green;')
            console.log('now value is', value)
            tick()
            setTimeout(() => {
                console.log('%cend of async tick', 'background: black;')
                console.log('now value is', value)
            })
            console.log('%cend tick', 'background: red;')
            console.log('now value is', value)
            running = false

        }
    }, 1000)


    function tick() {
        // if (!running)
        //     console.log('%c RUN ERROR!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');

        if (!childRendered)
            return false
        if (!value) {
            console.log('%c ERROR!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
        }
        if (!currentFigure) {
            currentFigure = figures[Math.trunc(Math.random() * figures.length)]
            addFigure()
        } else {
            moveDown()
        }


    }


    const addFigure = () => {
        console.log('adding new figure, it is', currentFigure, 'now field is', value)
        const field = JSON.parse(JSON.stringify(value))
        const places = 10 - currentFigure[0].length
        const start = Math.trunc(Math.random() * (places + 1))
        figurePos.x = start
        figurePos.y = 0
        for (let i = 0; i < currentFigure.length; i++) {
            for (let j = 0; j < currentFigure[0].length; j++) {
                if ((field[i][start + j] === 0) && (currentFigure[i][j] === 1)) {
                    field[i][start + j] = 2
                }
                if ((field[i][start + j] === 1) && (currentFigure[i][j] === 1)) {
                    gameOver.current = true
                    console.log('game over')

                    clearInterval(loopId)
                    window.removeEventListener('keydown', keyPressHandler, false)
                    rerender(!temp)
                    return 0
                }
            }
        }
        console.log('%c123', 'color:yellow');
        setValue(field)
    }


    const moveDown = () => {
        console.log(figurePos.x, figurePos.y)
        const field = JSON.parse(JSON.stringify(value))

        const checkFigure = () => {
            for (let row = field.length - 1; row >= 0; row--) {
                for (let col = field[0].length - 1; col >= 0; col--) {
                    if (field[row][col] === 2 && (!field[row + 1] || field[row + 1][col] === 1)) {
                        return false
                    }
                }
            }
            return true
        }

        if (!field.flat().includes(2))
            return false

        if (checkFigure()) {
            for (let row = field.length - 1; row >= 0; row--) {
                for (let col = field[0].length - 1; col >= 0; col--) {
                    if (field[row][col] === 2) {
                        field[row + 1][col] = 2
                        field[row][col] = 0

                    }
                }
            }
            figurePos.y++
        }
        if (!checkFigure()) {
            console.log('removing figure')
            console.log(Number(scoreTable.current.innerText.split(' ')[1]), 'это вот')
            scoreTable.current.innerText = 'Score: ' + (Number(scoreTable.current.innerText.split(' ')[1]) + 1)
            currentFigure = 0
            for (let row = field.length - 1; row >= 0; row--) {
                for (let col = field[0].length - 1; col >= 0; col--) {
                    if (field[row][col] === 2)
                        field[row][col] = 1
                }
            }
            figurePos.reset()
            console.log('removed,field is', field)

            setTimeout(tick)
        }

        console.log('%c123', 'color:yellow');
        setValue(checkClear(field))
    }


    const figures = [
        [[0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]],

        [[0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]],

        [[0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]],

        [[1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]],

        [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]],

        [[1, 1],
            [1, 1]],

        [[0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]],
    ]


    let y = document.documentElement.clientHeight
    const cellSize = y / 25
    const style = {
        height: cellSize * 20,
        width: cellSize * 10
    }

    const checkClear = (field) => {


        for (let row = 0; row < field.length; row++) {
            if (field[row].every(elem => elem === 1)) {
                console.log('надо удалить ряд', row)
                for (let i = row; i > 0; i--) {
                    field[i] = field[i - 1]
                }
            }

        }
        return field
    }


    function rotate() {
        let tempFigure = currentFigure[0].map((val, index) => currentFigure.map(row => row[index]).reverse())
        console.log(tempFigure)
        const field = JSON.parse(JSON.stringify(value))
        for (let row = field.length - 1; row >= 0; row--) {
            for (let col = field[0].length - 1; col >= 0; col--) {
                if (field[row][col] === 2)
                    field[row][col] = 0
            }
        }
        console.log('checking from', figurePos.x, figurePos.y, 'to', figurePos.x + tempFigure.length - 1, figurePos.y + tempFigure.length - 1)
        for (let row = figurePos.y; row < figurePos.y + tempFigure.length; row++) {
            for (let col = figurePos.x; col < figurePos.x + tempFigure.length; col++) {
                if ((!field[row]) || (field[row][col] !== 0))
                    return false
            }
        }

        for (let row = figurePos.y; row < figurePos.y + tempFigure.length; row++) {
            for (let col = figurePos.x; col < figurePos.x + tempFigure.length; col++) {
                field[row][col] = tempFigure[row - figurePos.y][col - figurePos.x] * 2
            }
        }
        currentFigure = tempFigure
        console.log('%c123', 'color:yellow');
        setValue(field)
        return true
    }


    const close = () => {
        window.removeEventListener('keydown', keyPressHandler, false)
        clearInterval(loopId)
        setToggle(!toggle)
    }

    function MoveSide(Side) {
        if (!value || gameOver.current || !currentFigure || !childRendered)
            return false
        if (!currentFigure)
            console.log('%c MOVESIDE ERROR!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
        if (!childRendered)
            console.log('%c MOVESIDE WHEN RENDER ERROR!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');

        const dir = Side === 'left' ? -1 : 1
        console.log('value сейчас', value)
        const field = JSON.parse(JSON.stringify(value))
        console.log('для движения получили', field)
        for (let row = field.length - 1; row >= 0; row--) {
            for (let col = field[0].length - 1; col >= 0; col--) {
                if (field[row][col] === 2 && !((field[row][col + dir] === 0) || (field[row][col + dir] === 2))) {
                    return false
                }
            }
        }
        switch (Side) {
            case 'left':
                for (let row = 0; row < field.length; row++) {
                    for (let col = 0; col < field[0].length; col++) {
                        if (field[row][col] === 2) {
                            field[row][col - 1] = 2
                            field[row][col] = 0
                        }
                    }
                }
                figurePos.x--
                console.log('%c123', 'color:yellow');
                setValue(field)
                break
            case 'right':
                for (let row = field.length - 1; row >= 0; row--) {
                    for (let col = field[0].length - 1; col >= 0; col--) {
                        if (field[row][col] === 2) {
                            field[row][col + 1] = 2
                            field[row][col] = 0
                        }
                    }
                }
                figurePos.x++
                console.log('%c123', 'color:yellow');
                setValue(field)
                break

        }
    }

    function keyPressHandler(event) {
        if ((event.key === 'ArrowUp') && (currentFigure)) {
            console.log('rotate', rotate())
            // let field = JSON.parse(JSON.stringify(value))
            // const index = 19
            // for (let i = index; i > 0; i--) {
            //     field[i] = field[i - 1]
            // }
            // console.log('%c123','color:yellow'); setValue(field)

        }
        if (event.key === 'ArrowDown') {
            if (currentFigure && !gameOver.current && childRendered)
                moveDown()

        }
        if (event.key === 'ArrowLeft') {
            MoveSide('left')
        }
        if (event.key === 'ArrowRight') {
            MoveSide('right')

        }
    }

    const restart = () => {
        console.log('restarting')
        scoreTable.current.innerText = 'Score: 0'
        for (let row = -2; row < 20; row++) {
            arr[row] = [];
            for (let col = 0; col < 10; col++) {
                arr[row][col] = 0;
            }
        }
        console.log('%c123', 'color:yellow');
        setValue(arr)
        currentFigure = 0
        figurePos.reset()

        gameOver.current = false
        window.removeEventListener('keydown', keyPressHandler, false)
        clearInterval(loopId)
        rerender(!temp)
    }
    window.addEventListener('keydown', keyPressHandler, false)


    return (
        <Transition in={toggle} timeout={690} unmountOnExit onExited={() => {
            window.removeEventListener('keydown', keyPressHandler, false)
            clearInterval(loopId)
            props.goBack()
        }}>
            {state => <div className={`tetris-wrapper ${state}`} style={style}>
                <h1 style={{color: 'white', margin: 0}} ref={scoreTable}>Score: 0</h1>
                <TetrisField cellSize={cellSize} onMount={onChildMount}>

                </TetrisField>
                <button className='back-btn' onClick={close}>Back</button>
                {gameOver.current ?
                    <button className='restart-btn' onClick={restart}>Restart</button>
                    : null}
            </div>}
        </Transition>)
}