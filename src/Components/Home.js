import React from 'react';
import ErrorBox from './ErrorBox';

export default class Home extends React.Component{
    componentDidMount(){
        this.checkLoggedIn();
    }

    checkLoggedIn(){
        var user = localStorage.getItem('oc_user');
        if(user){
            console.log("Logged in...");
        }else{
            window.location.href = "/";
        }
    }


    render(){
        return(
            <div className="appContainer">
            <ErrorBox/>

            <h2>Home</h2>
            </div>
        );
    }

}