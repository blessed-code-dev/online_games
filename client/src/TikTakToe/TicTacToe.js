import React, { useRef, useState} from "react";
import axios from "axios";
import Field from "../Field/Field";
import {Transition} from "react-transition-group";
import config from '../config.json'


function TicTacToe(props) {
    const devMode = config.devMode

    const state = useRef(['', '', '', '', '', '', '', '', ''])
    const stage = useRef('turn')
    const [temp, rerender] = useState(true)  //state just to rerender when we need
    const botTurnPhrase = ['Hmmm', 'Let me think...', 'I`m thinking']
    const [toggle, setToggle] = useState(true)

    const log = (value) => {
        if (devMode)
            console.log(value)
    }
    function checkEnd() {
        const field = [state.current.slice(0, 3), state.current.slice(3, 6), state.current.slice(6, 9)]
        log(field)
        if (!field.flat().includes('') && !field.flat().includes('?')) {
            stage.current = 'draw'
            return [-1, -1]
        }
        for (let row = 0; row < 3; row++) {
            if (field[row][0] === field[row][1] && field[row][1] === field[row][2]) {
                if (field[row][0] === 'x') {
                    log('x won on ', row, 'row')
                    stage.current = 'end'
                    return [row * 3, row * 3 + 2]
                } else if (field[row][0] === 'o') {
                    stage.current = 'end'
                    log('0 won on ', row, 'row')
                    return [row * 3, row * 3 + 2]
                }
            }
        }

        for (let col = 0; col < 3; col++) {
            if (field[0][col] === field[1][col] && field[1][col] === field[2][col]) {
                if (field[0][col] === 'x') {
                    log('x won on ', col, 'col')
                    stage.current = 'end'
                    return [col, col + 6]

                } else if (field[0][col] === 'o') {
                    log('o won on ', col, 'col')
                    stage.current = 'end'
                    return [col, col + 6]

                }
            }
        }

        if (field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
            if (field[0][0] === 'x') {
                // drawLine(0, 8)
                log('x won on main dia')
                stage.current = 'end'
                return [0, 8]
            } else if (field[0][0] === 'o') {
                log('0 won on main dia')
                stage.current = 'end'
                return [0, 8]

            }
        }
        if (field[0][2] === field[1][1] && field[1][1] === field[2][0]) {

            if (field[0][2] === 'x') {
                log('x won on sec dia')
                stage.current = 'end'

                return [2, 6]

            } else if (field[0][2] === 'o') {
                log('0 won on sec dia')
                stage.current = 'end'
                return [2, 6]
            }


        }
        return 0
    }

    function Picked(index) {

        log('Pick ', index)
        state.current[index] = 'o'
        stage.current = 'wait'
        checkEnd()
        rerender(Math.random())
        if (stage.current === 'wait')
            axios({
                method: 'get',
                url: `${config.baseUri}field_api`,
                headers: {
                    nextStep: `${index}`,
                    board: state.current.join('/')
                }
            }).then(res => {
                const botStep = res.data.myStep
                state.current[botStep[0] + botStep[1] * 3] = 'x'
                stage.current = 'turn'
                checkEnd()
                rerender(Math.random())
            })

    }

    function Selected(index) {
        log('Select ', index)
        state.current = state.current.map(value => value === '?' ? '' : value).map(value => value === '' ? 'w' : value).map(value => value === 'w' ? '' : value)
        state.current[index] = '?'
        rerender(Math.random())

    }

    function unpickAll() {
        log('Unpick All ')
        state.current = state.current.map(value => value === '?' ? '' : value).map(value => value === '' ? 'w' : value).map(value => value === 'w' ? '' : value)
        rerender(Math.random())
    }

    function text() {
        if (stage.current === 'turn')
            return 'Your turn'
        if (stage.current === 'wait')
            return botTurnPhrase[Math.trunc(Math.random() * botTurnPhrase.length)]
        if (stage.current === 'end')
            return 'GG'
        if (stage.current === 'draw')
            return 'Draw'
    }

    function restart() {
        state.current = ['', '', '', '', '', '', '', '', '']
        stage.current = 'turn'
        rerender(Math.random())
    }

    return <Transition in={toggle} timeout={690} unmountOnExit onExited={() => {
        props.goBack()
    }}>

        {stat =>

            <div className={`ticTacToe ${stat}`}>
                <div className={`tictactoe-wrapper`}>
                    <p className='UpperText'>{text()}</p>
                    <Field state={state.current} onSelect={Selected} onPick={Picked} unpickAll={unpickAll}
                           myTurn={stage.current === 'turn'} res={checkEnd()}>
                    </Field>
                    <button className='back-btn' onClick={() => {
                        setToggle(!toggle)
                    }}>
                    </button>
                    {(stage.current === 'draw' || stage.current === 'end') ?
                        <button className='restart-btn' onClick={restart}> </button>
                        : null}
                </div>
            </div>}
    </Transition>
}

export default TicTacToe