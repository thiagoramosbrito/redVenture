import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Intro from './pages/Intro';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Purchase from './pages/Purchase';

export default function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Intro} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/results" component={Results} />
            <Route path="/purchase" component={Purchase} />
        </BrowserRouter>
    );
}