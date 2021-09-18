import React, {useRef, useState} from "react";
import {Transition} from "react-transition-group";
import SnakeField from "../SnakeField/SnakeField";
import config from "../config.json";

export default (props) => {
    const devMode = config.devMode
    const [toggle, setToggle] = useState(true)
    const [temp, rerender] = useState(true) //using this state only to rerender component
    const gameOver = useRef(false)
    const scoreTable = useRef()
    let wantedDir = 'left'
    const fieldWidth = 30
    const fieldHeight = 20
    let value = null;
    let setValue = null;
    let speedKf = 1
    setTimeout(() => {
        if (!gameOver.current)
            tick()
    }, 100)

    const log = (value) => {
        if (devMode)
            console.log(value)
    }

    const snake = {
        headPos: {
            x: 0,
            y: 0
        },
        length: 0,
        currentDir: 0
    }

    const tick = () => {
        moveSnake()
        log('tick')
        if (!gameOver.current)
            setTimeout(() => {

                tick()
            }, 100 * speedKf)
    }

    const moveSnake = () => {
        const field = getValue()
        let randX
        let randY
        for (let row = 0; row < fieldHeight; row++) {
            for (let col = 0; col < fieldWidth; col++) {
                if (field[row][col] > 0)
                    field[row][col]++
                if (field[row][col] > snake.length)
                    field[row][col] = 0
            }
        }


        switch (wantedDir) {
            case "left":
                snake.headPos.x--
                if (snake.headPos.x < 0)
                    snake.headPos.x = fieldWidth - 1
                snake.currentDir = 'left'
                break

            case "right":
                snake.headPos.x++
                if (snake.headPos.x > fieldWidth - 1)
                    snake.headPos.x = 0
                snake.currentDir = 'right'
                break

            case "up":
                snake.headPos.y--
                if (snake.headPos.y < 0)
                    snake.headPos.y = fieldHeight - 1
                snake.currentDir = 'up'
                break

            case "down":
                snake.headPos.y++
                if (snake.headPos.y > fieldHeight - 1)
                    snake.headPos.y = 0
                snake.currentDir = 'down'
                break
            default:
        }


        if (field[snake.headPos.y][snake.headPos.x] > 0) {
            endGame()
        }

        if (field[snake.headPos.y][snake.headPos.x] === -1) {
            field[snake.headPos.y][snake.headPos.x] = 0
            snake.length = snake.length + 2
            scoreTable.current.innerText = 'Score: ' + (Number(scoreTable.current.innerText.split(' ')[1]) + 2)
            do {
                randX = Math.trunc(Math.random() * fieldWidth)
                randY = Math.trunc(Math.random() * fieldHeight)
            } while ((field[randY][randX] !== 0) || ((randY === snake.headPos.y) && ((randX === snake.headPos.x))))
            field[randY][randX] = -1
        }

        field[snake.headPos.y][snake.headPos.x] = 1

        setValue(field)

    }

    const onChildMount = (dataFromChild) => {
        value = dataFromChild[0]
        setValue = dataFromChild[1]
        if (!value)
            initStart()
    }


    const getValue = () => {
        const arr = []
        for (let row = 0; row < fieldHeight; row++) {
            arr[row] = [];
            for (let col = 0; col < fieldWidth; col++) {
                arr[row][col] = value[row][col];
            }
        }
        return arr
    }

    let y = document.documentElement.clientHeight
    const cellSize = y / 25
    const style = {
        height: cellSize * fieldHeight,
        width: cellSize * fieldWidth
    }

    function endGame() {
        log('GG')
        gameOver.current = true
        window.removeEventListener('keydown', keyDownHandler, false)
        window.removeEventListener('keyup', keyUpHandler, false)
        rerender(!temp)
    }

    function keyDownHandler(event) {

        switch (event.key) {
            case 'ArrowUp':
                if (wantedDir === 'up')
                    speedKf = 0.3
                if (snake.currentDir !== 'down')
                    wantedDir = 'up'
                break;
            case 'ArrowDown':
                if (wantedDir === 'down')
                    speedKf = 0.3
                if (snake.currentDir !== 'up')
                    wantedDir = 'down'
                break;
            case 'ArrowLeft':
                if (wantedDir === 'left')
                    speedKf = 0.3
                if (snake.currentDir !== 'right')
                    wantedDir = 'left'
                break;
            case 'ArrowRight':
                if (wantedDir === 'right')
                    speedKf = 0.3
                if (snake.currentDir !== 'left')
                    wantedDir = 'right'
                break
            default:
        }
    }

    function keyUpHandler() {
        speedKf = 1
    }


    window.addEventListener('keydown', keyDownHandler, false)
    window.addEventListener('keyup', keyUpHandler, false)


    function restart() {
        window.removeEventListener('keydown', keyDownHandler, false)
        window.removeEventListener('keyup', keyUpHandler, false)
        setValue(0)
        gameOver.current = false
        rerender(!temp)
    }

    const initStart = () => {
        const arr = []
        let randX
        let randY
        for (let row = 0; row < fieldHeight; row++) {
            arr[row] = [];
            for (let col = 0; col < fieldWidth; col++) {
                arr[row][col] = 0;
                if ((row === 10) && (col >= 14) && (col <= 17))
                    arr[row][col] = 1 + arr[row][col - 1];
            }
        }
        do {
            randX = Math.trunc(Math.random() * fieldWidth)
            randY = Math.trunc(Math.random() * fieldHeight)
        } while (arr[randY][randX] !== 0)
        log('coords are', randX, randY)
        arr[randY][randX] = -1
        snake.length = 4
        snake.headPos.x = 14
        snake.headPos.y = 10
        snake.currentDir = 'left'
        setValue(arr)
    }

    const close = () => {
        window.removeEventListener('keydown', keyDownHandler, false)
        window.removeEventListener('keyup', keyUpHandler, false)
        setToggle(!toggle)
    }

    return (
        <Transition in={toggle} timeout={690} unmountOnExit onExited={() => {
            window.removeEventListener('keydown', keyDownHandler, false)
            window.removeEventListener('keydown', keyUpHandler, false)
            props.goBack()
        }}>
            {state =>
                <div className={`snake ${state}`}>
                    <div className={`snake-wrapper `} style={style}>
                        <h1 style={{color: 'white', margin: 0}} ref={scoreTable}>Score: 0</h1>
                        <SnakeField cellSize={cellSize} onMount={onChildMount}>

                        </SnakeField>
                        <button className='back-btn' onClick={close}> </button>
                        {gameOver.current ?
                            <button className='restart-btn' onClick={restart}> </button>
                            : null}
                    </div>
                </div>}
        </Transition>)
}