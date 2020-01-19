import React from 'react';
import './Intro.scss';
import logo from '../assets/logo.svg';
import Button from '../components/Button';
import {Animated} from "react-animated-css";

export default function Intro({ history }) {

    function handleStart(e){
        e.preventDefault();
        history.push('/quiz');
    }

    return(
        <div className="intro-container">
            <div className="left-side">
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <img className="logo" src={logo}/>
            </Animated>
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
            <h1>Find your next green friend</h1>
            </Animated>
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <Button onClick={handleStart} className="next" label="Start quiz"></Button>
            </Animated>
            </div>
            <div className="right-side">
               
            </div>
        </div>
    );
}