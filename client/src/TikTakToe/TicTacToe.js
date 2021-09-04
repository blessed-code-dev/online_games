import './TicTacToe.css'
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Field from "../Field/Field";
import {Transition} from "react-transition-group";

//epilogue
// Callbacks are defined to listen to events over time.
// They`re declared and then they stick around, listening.
// But there usually comes a time when they can stop listening.
// And if they're not needed anymore, they should be cleaned up.
// This is because keeping event listeners around isn't free.
// It takes memory and some processing power from the browser and the host computer.

// What makes this more important is that React components
// will often be re-rendered, and the code to set up event
// listeners will have the opportunity to run many times.
// This can create errors by setting up multiple listeners
// where we're actually expecting a single listener run per event occurrence.


function TicTacToe(props) {
    console.log('new rerender')

    const canvasRef = useRef(null)
    const state = useRef(['', '', '', '', '', '', '', '', ''])
    const stage = useRef('turn')
    const upperText = useRef('Your turn')
    const [temp, rerender] = useState('')  //state just to rerender when we need
    const botTurnPhrase = ['Hmmm', 'Let me think...', 'I`m thinking']
    const [toggle, setToggle] = useState(true)


    function checkEnd() {
        const b = [state.current.slice(0, 3), state.current.slice(3, 6), state.current.slice(6, 9)]
        //console.log(b)
        if (!b.flat().includes('') && !b.flat().includes('?')) {
            stage.current = 'draw'
            return [-1, -1]
        }
        // Checking for Rows for X or O victory.
        for (let row = 0; row < 3; row++) {
            if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
                if (b[row][0] === 'x') {
                    //console.log('x won on ', row, 'row')
                    // drawLine(row * 3, row * 3 + 2)
                    stage.current = 'end'
                    return [row * 3, row * 3 + 2]
                } else if (b[row][0] === 'o') {
                    // drawLine(row * 3, row * 3 + 2)
                    stage.current = 'end'
                    //console.log('0 won on ', row, 'row')
                    return [row * 3, row * 3 + 2]
                }
            }
        }

        // Checking for Columns for X or O victory.
        for (let col = 0; col < 3; col++) {
            if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
                if (b[0][col] === 'x') {
                    //console.log('x won on ', col, 'col')
                    // drawLine(col, col + 6)
                    stage.current = 'end'
                    return [col, col + 6]

                } else if (b[0][col] === 'o') {
                    // drawLine(col, col + 6)
                    //console.log('o won on ', col, 'col')
                    stage.current = 'end'
                    return [col, col + 6]

                }
            }
        }

        // Checking for Diagonals for X or O victory.
        if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
            if (b[0][0] === 'x') {
                // drawLine(0, 8)
                //console.log('x won on main dia')
                stage.current = 'end'
                return [0, 8]
            } else if (b[0][0] === 'o') {
                // drawLine(0, 8)
                //console.log('0 won on main dia')
                stage.current = 'end'
                return [0, 8]

            }
        }
        if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {

            if (b[0][2] === 'x') {
                // drawLine(2, 6)
                //console.log('x won on sec dia')
                stage.current = 'end'

                return [2, 6]

            } else if (b[0][2] === 'o') {
                // drawLine(2, 6)
                //console.log('0 won on sec dia')
                stage.current = 'end'
                return [2, 6]
            }


        }
        //console.log('return 0')
        return 0
    }

    function Picked(index) {

        //console.log('Pick ', index)
        state.current[index] = 'o'
        stage.current = 'wait'
        checkEnd()
        rerender(Math.random())
        if (stage.current === 'wait')
            axios({
                method: 'get',
                url: 'http://localhost:5000/',
                headers: {
                    nextStep: `${index}`,
                    board: state.current.join('/')
                }
            }).then(res => {
                // //console.log(res.data.myStep);
                const botStep = res.data.myStep
                state.current[botStep[0] + botStep[1] * 3] = 'x'
                stage.current = 'turn'
                checkEnd()
                rerender(Math.random())
            })

    }

    function Selected(index) {
        //console.log('Select ', index)
        let newState = JSON.parse(JSON.stringify(state))
        state.current = state.current.map(value => value === '?' ? '' : value).map(value => value === '' ? 'w' : value).map(value => value === 'w' ? '' : value)
        state.current[index] = '?'
        rerender(Math.random())

    }

    function unpickAll() {
        //console.log('Unpick All ')
        let newState = JSON.parse(JSON.stringify(state))
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

    return <Transition in={toggle} timeout={700} unmountOnExit onExited={()=>{props.goBack()}}>
        {stat => <div className={`${stat}`}>
            <p className='UpperText'>{text()}</p>
            <Field state={state.current} onSelect={Selected} onPick={Picked} unpickAll={unpickAll}
                   myTurn={stage.current === 'turn'} res={checkEnd()}>
            </Field>
            <button className='back-btn' onClick={()=>{setToggle(!toggle)}}>Back</button>
            {(stage.current === 'draw' || stage.current === 'end') ?
                <button className='restart-btn' onClick={restart}>Restart</button>
                : null}
        </div>}
    </Transition>
}

export default TicTacToe