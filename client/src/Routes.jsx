import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import Call from './pages/Call/Call';

const Routes = () => (
    <Router>
        <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/room" component={Room} />
            <Route exact path="/" component={Call} />
        </Switch>
    </Router>
)

export default Routes;