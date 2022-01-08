import React, {useState} from "react";
import {Transition} from "react-transition-group";
import TicTacToe from "./TikTakToe/TicTacToe";
import Tetris from "./Tetris/Tetris";
import Snake from "./Snake/Snake";
import './styles.css'
import './score-popup.css'

function App() {
    const [layout, setLayout] = useState('Menu')

    function back() {
        setLayout('Menu')
    }

    return (
        <div>

            <Transition in={layout === 'Menu'} appear={true} timeout={{
                appear: 1000,
                enter: 1000,
                exit: 690,
            }}
                        unmountOnExit
                        onExited={() => {
                            setLayout(layout.split(' ')[2])
                        }}>
                {state =>
                    <div className={`MenuBlock ${state}`}>
                        <div className={'MenuItem'} onClick={() => {
                            setLayout('Switching to TicTacToe')

                        }}/>
                        <div className={'MenuItem'} onClick={() => {
                            setLayout('Switching to Tetris')
                        }}/>
                        <div className={'MenuItem'} onClick={() => {
                            setLayout('Switching to Snake')
                        }}/>
                    </div>}
            </Transition>


            {layout === 'TicTacToe' ?
                <TicTacToe goBack={back}/>
                : null
            }

            {layout === 'Tetris' ?
                <Tetris goBack={back}/>
                : null
            }

            {layout === 'Snake' ?
                <Snake goBack={back}/>
                : null
            }

        </div>


    )
}

export default App;