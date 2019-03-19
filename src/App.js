import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";

import Home from "./pages/Home";
import ExpertsResults from "./pages/ExpertsResults";
import ExpertProfile from "./pages/ExpertProfile";

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/results" component={ExpertsResults} />
                <Route exact path="/profile" component={ExpertProfile} />
            </div>
        </Router>
    );
};

export default App;
