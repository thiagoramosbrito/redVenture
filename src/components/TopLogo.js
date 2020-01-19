import React from 'react';
import './TopLogo.scss';
import logo from '../assets/logo.svg';



export default function TopLogo(props){
    return (
        <div className={`top-logo-container ${props.className}`}>
            <img className="top-logo" src={logo}/>
        </div>
        
    );
}