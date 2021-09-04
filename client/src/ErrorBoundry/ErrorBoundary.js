import React, {Component} from "react";

export default class ErrorBoundary extends Component {
    state = {
        hasError: false
    }


    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        })
    }

    render() {
        if(this.state.hasError){
            return <h1>Error</h1>
        }
        return this.props.children

    }
}