import { Component } from 'react'

export default class ErrorBoundary extends Component {
    state = {
        hasError: false,
        message : null
    };

    componentDidCatch(error : Error , _errorInfo : any) {
        this.setState({hasError : true, message : error})
    }

    render() {
        if (this.state.hasError)
            return (
                <div>
                    <h1>Something went wrong </h1>
                    <h4>There was an error ${this.state.message}</h4>
                </div>
            )
        return this.props.children;
    }
}
