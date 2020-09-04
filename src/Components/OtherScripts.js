import React from 'react';

export default class OtherScripts extends React.Component(){
animateNo(pin, input){
    pin.style.marginLeft = "-4%";
        setTimeout(()=>{pin.style.marginLeft = "4%"; pin.style.transition = ".25s"}, 250);
        setTimeout(()=>{pin.style.marginLeft = "-3%"; pin.style.transition = ".25s"}, 500);
        setTimeout(()=>{pin.style.marginLeft= "2%"; pin.style.transition = ".25s"; input.value = ""}, 650);
        setTimeout(()=>{pin.style.marginLeft = "1%"; pin.style.transition = ".25s"}, 900);
        setTimeout(()=>{pin.style.marginLeft = "0%"; pin.style.transition = ".70s"}, 901);
}

}