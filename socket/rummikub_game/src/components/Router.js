import React from 'react' ;
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom' ;

import Home from './Home' ;
import Room from './Room' ;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/room" component={Room} />
            <Redirect path="*" to="/" />
        </Switch>
    </Router>
) ;