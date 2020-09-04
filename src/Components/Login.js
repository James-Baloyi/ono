import React from 'react';
import firebase from './firebaseConfig';
import ErrorBox from './ErrorBox';
import './App.css';
import { NavLink } from 'react-router-dom';


export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            cellNo: '',
            pin: '',
            userPin: '',
            error: ''
        }
    }


    componentDidMount(){
        this.checkLoggedIn();
        document.getElementsByClassName("signedOutContainer")[0].style.height = window.innerHeight + 'px';
        setTimeout(()=>{document.getElementsByClassName("signedOutContainer")[0].classList.toggle("signedOutContainerShowing")},1400);
        this.checkLoggedIn();
        setInterval(()=>{this.altColour()}, 4000);
    }


    checkLoggedIn(){
        var user = localStorage.getItem('oc_user');
        console.log(user);
        if(user){
            window.location.href = "/home";
        }
    }

    verifyCellNo(){
        var cell = this.state.cellNo;
        if(cell.length == 10){
        document.getElementsByClassName("confirmPIN")[0].classList.toggle("confirmPINShowing");
        this.sendSMS();
        }else{
            this.setState({error: "Invalid phone number entered"});
            this.callError();
            this.animateNo(document.getElementsByClassName("registrationPanel")[0], document.getElementById("cellphone"));
        }
    }

    altColour(){
        var colours = ["#FFDAC1","#C7CEEA","#E2F0CB","#B5EAD7","#FF9AA2","#AFC7D0"];
        var rand = parseInt(Math.random()*(colours.length - 1));
        console.log(rand,colours[rand]);
        document.getElementsByClassName("signedOutContainerShowing")[0].style.backgroundColor = colours[rand];
        document.getElementsByClassName("signedOutContainerShowing")[0].style.transition = '4s';
    }

    verifyPIN(){
        if(this.state.pin == this.state.userPin){
            
            var oc_email = this.state.cellNo + '_oc'+this.state.pin+'@onecab.co.za';
            console.log(oc_email);
            var password = this.state.pin + '_oc';
            firebase.auth().createUserWithEmailAndPassword(oc_email, password).then(result => {
                    var user = firebase.auth().currentUser;
                    console.log(user);
                    localStorage.setItem('oc_user', JSON.stringify(user));
                    window.location.href = "/home";
            });
        }else{
            //show error
            this.setState({error: "Invalid PIN entered"});
            this.callError();
            var pin = document.getElementsByClassName("confirmPINShowing")[0];
            this.animateNo(pin, document.getElementById("cellphone1"));
        }
    }

    callError(){
        var errorBox = document.getElementsByClassName("errorBox")[0];
        errorBox.classList.toggle("errorShowing");
        setTimeout(()=>{errorBox.classList.toggle("errorShowing")}, 2500);
    }

    animateNo(pin, input){
        pin.style.marginLeft = "-4%";
            setTimeout(()=>{pin.style.marginLeft = "4%"; pin.style.transition = ".25s"}, 250);
            setTimeout(()=>{pin.style.marginLeft = "-3%"; pin.style.transition = ".25s"}, 500);
            setTimeout(()=>{pin.style.marginLeft= "2%"; pin.style.transition = ".25s"; input.value = ""}, 650);
            setTimeout(()=>{pin.style.marginLeft = "1%"; pin.style.transition = ".25s"}, 900);
            setTimeout(()=>{pin.style.marginLeft = "0%"; pin.style.transition = ".70s"}, 901);
    }

    sendSMS(){
        var pin = Math.floor(Math.random()*100000);
        this.setState({pin: pin});
        console.log(pin);
        var number = this.state.cellNo.replace('0','27');
        var body = `Your Onecab verification is ${pin}`;
        var cors = 'https://cors-anywhere.herokuapp.com';
        var sms = 'https://api.bulksms.com/v1/messages/send?to='+number+'&body='+body;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', cors+'/'+sms, true);
        xhr.setRequestHeader('path', 'api.bulksms.com/v1/messages/send?');
        xhr.setRequestHeader('Authority', 'api.bulksms.com');
        xhr.setRequestHeader('scheme','https');
        xhr.setRequestHeader('origin', 'https://onecab.co.za');
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://onecab.co.za');
        xhr.setRequestHeader('Authorization', 'Basic emlwaTpaaXBpMTIzNDU2');
        xhr.onreadystatechange = () => {
        if(xhr.readyState == '4'){
          console.log("Success");
          }else{
          console.log("Unable to send...");
          }
          }
        //xhr.send();
        }


    render(){
        return(
            <div className="signedOutContainer">
                <ErrorBox error={this.state.error}/>
                <div className="confirmPIN">
                <br/>
                <h2 id="welcome-text">Verification</h2><br/>
                    <p id="welcome-small-text">We've sent a verification PIN to {this.state.cellNo}. Please enter the PIN below:</p><br/>
                    <input type="number" onChange={(text)=>{this.setState({userPin: text.target.value})}} style={{marginLeft: 20}} id="cellphone1" max-length="10" placeholder="Verification PIN"/><br/>
                    <button id="submitLogin" style={{marginLeft: 20}} onClick={()=>{this.verifyPIN()}}>Finish</button>
                    <br/><br/>
                    <button id="negative" style={{marginLeft: 20}} onClick={()=>{this.verifyCellNo()}}>Re-enter Phone Number</button>
                </div>


            <br/>
            <h2 id="welcome-text">Welcome.</h2><br/>
            <p id="welcome-small-text">Onecab is the fresh, new and affordable.
            By keeping our operations lean, small and agile we save you money on every journey that you take with us.</p><br/>

            <fieldset className="registrationPanel">
            <center>
            <p id="smallTitle">
            Create your account
            </p><br/>
            <input type="number" onChange={(text)=>{this.setState({cellNo: text.target.value})}} id="cellphone" max-length="10" placeholder="Cellphone Number"/><br/>
            <button id="submitLogin" onClick={()=>{this.verifyCellNo()}}>Continue</button>
            </center>
            </fieldset>
            </div>
        );
    }

}