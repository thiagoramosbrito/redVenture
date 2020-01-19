import React, { Component, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Button from '../components/Button';
import './Carrossel.scss';
import { withRouter } from 'react-router-dom';
import api from '../services/api';
import ModalNoPlantsFound from './ModalNoPlantsFound';
import ModalMissingArguments from './ModalMissingArguments';
//QUIZ SLIDE 1
import sun from '../assets/quiz/sun.png';
import highSun from '../assets/quiz/icons/HighSun.svg';
import highSunHover from '../assets/quiz/icons/HighSunHover.svg';
import lowSun from '../assets/quiz/icons/LowSun.svg';
import noSun from '../assets/quiz/icons/NoSun.svg';
//QUIZ SLIDE 2
import wateringcan from '../assets/quiz/wateringcan.png';
import ondeDrop from '../assets/quiz/icons/OneDrop.svg';
import twoDrops from '../assets/quiz/icons/TwoDrops.svg';
import threeDrops from '../assets/quiz/icons/ThreeDrops.svg';
//QUIZ SLIDE 3
import dog from '../assets/quiz/dog.png';
import pet from '../assets/quiz/icons/Pet.svg';

class Carrossel extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            carrosselPage: 0,
            buttonNextLabel: "next",
            buttonPrevLabel: "home",
            slideOneAnswer: "",
            slideTwoAnswer: "",
            slideThreeAnswer: null,
            activeSlideOne: "",
            activeSlideTwo: "",
            activeSlideThree: "",
            ModalNoPlantsFoundState: false,
            ModalMissingArgumentsState: false
        }
        this.handleCardClickSlideOne = this.handleCardClickSlideOne.bind(this);
        this.addActiveClass = this.addActiveClass.bind(this);
    }

    
    redirectToHome = () => {
        const { history } = this.props;
        if(history) history.push('/');
    }

    finishQuiz = () => {
        const { history } = this.props;
        if(history) history.push('/results');
    }

    async handleCarousel(side){
        let carrosselPage = this.state.carrosselPage;

        if(carrosselPage === 0){
            if(side === "prev"){
                this.redirectToHome();
            }else{
                this.setState(prevState => ({
                    carrosselPage : prevState.carrosselPage + 1,
                    buttonNextLabel : "next",
                    buttonPrevLabel: "previous"
                }));
            }
        }

        if(carrosselPage === 1){
            if(side === "prev"){
                this.setState(prevState => ({
                    carrosselPage : prevState.carrosselPage - 1,
                    buttonNextLabel : "next",
                    buttonPrevLabel: "home"
                }));
            }
            if(side === "next"){
                this.setState(prevState => ({
                    carrosselPage : prevState.carrosselPage + 1,
                    buttonNextLabel : "finish",
                    buttonPrevLabel: "previous"
                }));
                let button = document.querySelector('.buttons-row');
                button.style.justifyContent = "space-evenly";
            }
        }

        if(carrosselPage === 2){
            if(side === "prev"){
                this.setState(prevState => ({
                    carrosselPage : prevState.carrosselPage - 1,
                    buttonNextLabel : "next",
                    buttonPrevLabel: "previous"
                }));
                let button = document.querySelector('.buttons-row');
                button.style.justifyContent = "space-between";
            }
            if(side === "next"){
               await api.get(`?sun=${this.state.slideOneAnswer}&water=${this.state.slideTwoAnswer}&pets=${this.state.slideThreeAnswer}`)
               .then(response => {
                   const results = response.data;
                   this.setLocalStorage("results", JSON.stringify(results));
                   this.finishQuiz();
               })
               .catch(error => {
                   let errors = error.response;
                    console.log(errors.status);
                    let button = document.querySelector('.buttons-row');
                
                    if(errors.status === 404){
                        this.setState({
                            ModalNoPlantsFoundState: true,
                            carrosselPage: 0,
                            buttonNextLabel : "next",
                            buttonPrevLabel: "home"
                        });
                        button.style.justifyContent = "space-between";
                    }else if(errors.status === 422 && errors.data.error === "Missing arguments" ){
                        console.log(errors);
                        this.setState({
                            ModalMissingArgumentsState: true,
                            carrosselPage: 0,
                            buttonNextLabel : "next",
                            buttonPrevLabel: "home"
                        });
                        button.style.justifyContent = "space-between";
                    }
               })
            }
        }
    }

    addActiveClass(e){
        const clicked = e.target.id;

        if(clicked === "high" || clicked === "low" || clicked === "no"){
            if(this.state.activeSlideOne === clicked) { 
                this.setState({activeSlideOne: ''});
            } else {
                this.setState({activeSlideOne: clicked})
           }
        }

        if(clicked === "oneDrop" || clicked === "twoDrops" || clicked === "threDrops"){
            if(this.state.activeSlideTwo === clicked) { 
                this.setState({activeSlideTwo: ''});
            } else {
                this.setState({activeSlideTwo: clicked})
           }
        }

        if(clicked === "noCare" || clicked === "care"){
            if(this.state.activeSlideThree === clicked) { 
                this.setState({activeSlideThree: ''});
            } else {
                this.setState({activeSlideThree: clicked})
           }
        }
    }

    

    handleCardClickSlideOne(event){
        let name = event.target.name;
        this.addActiveClass(event);
        
        if(name === "high" || name === "low" || name === "no"){
            this.setState({
                slideOneAnswer: name
            });
        }
        if(name === "daily" || name === "regularly" || name === "rarely"){
            this.setState({
                slideTwoAnswer: name
            });
        }
        if(name === "false" || name === "true"){
            this.setState({
                slideThreeAnswer: name
            });
        }
    }

    setLocalStorage(keyname,value){
        localStorage.setItem(keyname, value);
    }
    
    

    render(){

        return (
            
            <div className="carrossel-container">
                <Carousel showArrows={false} showIndicators={false} showThumbs={false} showStatus={false} selectedItem={this.state.carrosselPage}>
                    <div id="slide-one" className="slide-content slide-one">
                        <img className="sun" src={sun} />
                        <h2>First, set the amount of <strong>sunlight</strong> your plant will get.</h2>
                        <div className="row-card-buttons">
                            <a className={`card ${this.state.activeSlideOne === "high" ? 'clicked': ''}`} id="high" name="high" onClick={this.handleCardClickSlideOne} >
                                <i></i>
                                <h3>High sunlight</h3>
                            </a>
                            <a className={`card ${this.state.activeSlideOne === "low" ? 'clicked': ''}`} id="low" name="low" onClick={this.handleCardClickSlideOne}>
                                <i></i>
                                <h3>Low sunlight </h3>
                            </a>
                            <a className={`card ${this.state.activeSlideOne === "no" ? 'clicked': ''}`} id="no" name="no" onClick={this.handleCardClickSlideOne}>
                                <i></i>
                                <h3>No sunlight</h3>
                            </a>
                        </div>
                    </div>
                    <div className="slide-content slide-two"> 
                        <img className="wateringcan" src={wateringcan} />
                        <h2>How often do you want to <strong>water</strong> your plant?</h2>
                        <div className="row-card-buttons">
                            <a className={`card ${this.state.activeSlideTwo === "oneDrop" ? 'clicked': ''}`} id="oneDrop" name="rarely" onClick={this.handleCardClickSlideOne}>
                                <i></i>
                                <h3>Rarely</h3>
                            </a>
                            <a className={`card ${this.state.activeSlideTwo === "twoDrops" ? 'clicked': ''}`} id="twoDrops" name="regularly" onClick={this.handleCardClickSlideOne}>
                                <i></i>
                                <h3>Regularly</h3>
                            </a>
                            <a className={`card ${this.state.activeSlideTwo === "threDrops" ? 'clicked': ''}`} id="threDrops" name="daily" onClick={this.handleCardClickSlideOne}>
                                <i></i>
                                <h3>Daily</h3>
                            </a>
                        </div>
                    </div>
                    <div className="slide-content slide-three">
                        <img className="dog" src={dog} />
                        <h2>Do you have pets? Do they <strong>chew</strong> plants?</h2>
                        <p>We are asking because some plants can be <strong>toxic</strong> for your buddy. </p>
                        <div className="row-card-buttons">
                            <a className={`card ${this.state.activeSlideThree === "care" ? 'clicked': ''}`} id="care" name="true" onClick={this.handleCardClickSlideOne}>
                                <i></i>
                                <h3>Yes</h3>
                            </a>
                            <a className={`card ${this.state.activeSlideThree === "noCare" ? 'clicked': ''}`} id="noCare" name="false" onClick={this.handleCardClickSlideOne}>
                                <i></i>
                                <h3>No/They don't care</h3>
                            </a>
                        </div>
                    </div>
                </Carousel>
                <div className="buttons-row">
                    <Button onClick={() => this.handleCarousel("prev")} className="carrossel prev" label={this.state.buttonPrevLabel}/>
                    <Button onClick={() => this.handleCarousel("next")} className="carrossel next" label={this.state.buttonNextLabel}/>
                </div>
                {this.state.ModalNoPlantsFoundState === true ? <ModalNoPlantsFound/> : ""}
                {this.state.ModalMissingArgumentsState === true ? <ModalMissingArguments/> : ""}
            </div>
        );
    }
}

export default withRouter(Carrossel);

