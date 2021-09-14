import React, {useState} from "react";


function App() {
    const divStyle = {
        textAlign: 'center',
        width:'100%'
    }

    const handle = (title = 'default') => {
        console.log('clicked on')
        setTitle(title)
        setVisible(!visible)
    }
    const [cars, setCars] = useState(
        [
            {name: 'car1', attr: 'what1?', vis: true},
        {name: 'car2',  attr: 'what?2', vis: true},
            {name: 'car3`', attr: 'what?3', vis: true}
        ]
    )

    const [visible, setVisible] = useState(true)

    const [title, setTitle] = useState('Top text')
    console.log('rendered again')

    function changeVis(index) {
        const cars_temp = [...cars]
        cars_temp[index].vis = !cars_temp[index].vis
        setCars(cars_temp)
        console.log(`vis at ${index} setted at ${cars_temp[index].vis}`)
    }

    function changeName(index, name) {
        console.log(`changing at ${index} to ${name}`)
        const cars_temp = [...cars]
        cars_temp[index].name = name
        setCars(cars_temp)
    }

    return (
        <div style={divStyle}>
            <Counter></Counter>
            <h2>{title}</h2>
            {console.log('repainted')}
            <input type="text" onChange={() => {
                setVisible(!visible)
                console.log(visible)
            }}/>
            <button onClick={handle.bind(this, 'lul')}>Press</button>
            <div style={{width: 500, margin: "auto", paddingTop: 20, border: '20px,solid,    black'}}>
                {visible ?
                    cars.map((car, index) => {
                        return car.vis ?
                            <ErrorBoundary  key={index}>
                                <Car name={car.name} attr={car.attr} onClick={handle} index={index} setVis={() => {
                                    changeVis(index)
                                }} onChangeName={(event) => {
                                    changeName(index, event.target.value)
                                }}> </Car> </ErrorBoundary>
                                : null
                                })
                                : null}
                            </div>
                            </div>
                    );
                }

                    export default App;
