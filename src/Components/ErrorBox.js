import React from 'react';

export default class ErrorBox extends React.Component{
    render(){
        return(
            <div className="errorBox">
                <center>
                <p id="errorText">{this.props.error}</p>
                </center>
            </div>
        );
    }
    
}