import './Car.css'
import Radium from "radium";
import React, {Component} from "react";

class Car extends Component {
    componentDidMount() {
        if (this.props.index===2)
    this.inputRef.focus()
    }


    render() {
        console.log('car render')

        const handle = () => {
            console.log('clicked on ' + this.props.name)
        }
        let style
        if (this.props.name === '')
            style = {color: 'red'}
        else
            style = {color: 'green'}

        const st = {
            ':hover': {
                border: '1px solid #aaa',
                boxShadow: '0 0 10px 10px rgba(0,0,0,.55)',
                cursor: 'pointer'
            }
        }


        return (
            <div className='Car' style={st}>
                <h1>Comp name:{this.props.name}</h1>
                <h1>Comp attr:{this.props.attr}</h1>
                <button onClick={this.props.setVis}>Press</button>
                <input ref={(inputRef) => (this.inputRef = inputRef)} type="text" onChange={this.props.onChangeName}
                       value={this.props.name}/>
            </div>
        )

    }
}


export default Radium(Car)
