import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './pages/Home/Home';
import Room from './pages/Room/Room';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/room" component={Room} />
        </Switch>
    </Router>
)

export default Routes;