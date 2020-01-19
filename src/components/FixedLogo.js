import React from 'react';
import './FixedLogo.scss';
import logoVertical from '../assets/logo-vertical.svg';

export default function FixedLogo(props){
    return (
        <div className={`fixed-logo-container ${props.className}`}>
            <img className="fixed-logo" src={logoVertical}/>
            <div className="verticalLine"></div>
        </div>
    );
}