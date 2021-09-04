import React, {Component} from "react";

export default class Counter extends Component{
    state={
        count:0
    }

    addCounter=()=>{
        this.setState({
            count:this.state.count+1
        })
    }
    minCounter=()=>{
        this.setState({
            count:this.state.count-1
        })
    }

    render() {
        return(
            <div>
                <h2>
                    Counter {this.state.count}
                </h2>
                <button onClick={this.addCounter}>+</button>
                <button onClick={this.minCounter}>-</button>
            </div>
        )
    }
}