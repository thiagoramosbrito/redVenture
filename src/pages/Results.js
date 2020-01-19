import React, {useState, useEffect} from 'react';
import './Results.scss';
import pick from '../assets/results/pick.png';
import Button from '../components/Button';
import FixedLogo from '../components/FixedLogo';
import TopLogo from '../components/TopLogo';
import {Animated} from "react-animated-css";



export default function Results({ match, history }){

    

    const [results, setResults] = useState([]);

    useEffect(() => {
        function loadResults() {
            let productsResults = localStorage.getItem('results');
            let products = JSON.parse(productsResults);
            setResults(products);
        }
        loadResults();
    },[match.params.id]);

    function setLocalStorage(keyname,value){
        localStorage.setItem(keyname, JSON.stringify(value));
    }

    function handleClick(e, data){
        e.preventDefault();
        setLocalStorage("productPick", data);
        history.push('/purchase');
    }


    return (
        <div className="results-container">
            <Animated></Animated>
            <FixedLogo className="results"></FixedLogo>
            <TopLogo className="results"></TopLogo>
            <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
                <img className="pick" src={pick} />
            </Animated>
            
            <h2>Our picks for you</h2>
            <div className="row-card-results">
                {results.map(result => (
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <div key={result.id} className="card" name="high">
                            <img src={result.url} />
                            <h3>{result.name}</h3>
                            <div className="info">
                                <div className="left-side">
                                    <p className="price">${result.price}</p>
                                </div>
                                <div className="right-side">
                                    <ul>
                                        {result.sun === "high" ? (
                                            <li className="highSun"></li>
                                        ) : result.sun === "low" ? (
                                            <li className="lowSun"></li>
                                        ) : result.sun === "no" ? (
                                            <li className="noSun"></li>
                                        ): (
                                            <li></li>
                                        )}
                                        
                                        {result.water === "daily" ? (
                                            <li className="threeDrop"></li>
                                        ) : result.water === "regularly" ? (
                                            <li className="twoDrop"></li>
                                        ) : result.water === "rarely" ? (
                                            <li className="oneDrop"></li>
                                        ): (
                                            <li></li>
                                        )}

                                        {result.toxicity === true ? (
                                            <li className="toxic"></li>
                                        ) : result.toxicity === false ? (
                                            <li className="nonToxic"></li>
                                        ) : (
                                            <li></li>
                                        )}  
                                    </ul>
                                </div>
                            </div>
                            <Button onClick={e => handleClick(e, result)} className="result" label="buy now"/>
                        </div>
                    </Animated>
                ))}
                
            </div>
        </div>
    );
}