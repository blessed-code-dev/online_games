import React, {useState} from "react";
import MenuItem from "./MenuItem/MenuItem";
import {Transition} from "react-transition-group";
import TicTacToe from "./TikTakToe/TicTacToe";
import Tetris from "./Tetris/Tetris";
import Snake from "./Snake/Snake";
import './styles.css'

function NewApp() {
    const [toggle, setToggle] = useState(true)
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
                        <MenuItem name='Раз' click={() => {
                            setLayout('Switching to TicTacToe')

                        }}/>
                        <MenuItem name='Два' click={() => {
                            setLayout('Switching to Tetris')
                        }}/>
                        <MenuItem name='Два' click={() => {
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

export default NewApp;


// return (
//
//<div>
//
// <Transition in={layout === 'Menu'} appear={true} timeout={{
//             appear: 1000,
//             enter: 1000,
//             exit: 690,
//         }}
//                     unmountOnExit
//                     onExited={() => {
//                         setLayout('TicTacToe')
//                     }}>
//             {state =>
//                 <div className={`MenuBlock ${state}`}>
//                     <MenuItem name='Раз' click={() => {
//                         setToggle(!toggle);
//                         setLayout('Switching')
//                     }}/>
//                     <MenuItem name='Два' click={() => setToggle(!toggle)}/>
//                     <MenuItem name='Три' click={() => setToggle(!toggle)}/>
//                 </div>}
//         </Transition>
//
//
//         {layout === 'TicTacToe' ?
//             <div className={`TicTacField`}>
//                 <TicTacToe goBack={back}/>
//             </div>
//             : null
//         }
//     </div>
//
//
// )
// }
//
// export default NewApp;
