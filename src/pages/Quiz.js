import React from 'react';
import FixedLogo from '../components/FixedLogo';
import TopLogo from '../components/TopLogo';
import Carrossel from '../components/Carrossel';
import {Animated} from "react-animated-css";


export default function Quiz(){
    return (
        
        <div className="quiz-container">
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <FixedLogo></FixedLogo>
            </Animated>
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <TopLogo></TopLogo>
            </Animated>
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <img></img>
            </Animated>
            <Animated animationIn="tada" animationOut="fadeOut" isVisible={true}>
                <h2></h2>
            </Animated>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Carrossel/>
            </Animated>
        </div>
    );
}

