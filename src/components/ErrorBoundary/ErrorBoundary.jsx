import { Component } from "react"
import ErrorMessage from "./ErrorMessage/ErrorMessage"

class ErrorBoundary extends Component {
    state = {
        error : false,
    };

    componentDidCatch(error, errorInfo){
        this.setState( {error: true} );
        console.log( `Some error occurred: ${errorInfo} `)
    };

    render(){
        if( this.state.error){
            return <ErrorMessage/>
        };

        return this.props.children;
    };
};


export default ErrorBoundary;