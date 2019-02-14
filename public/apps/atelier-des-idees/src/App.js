import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// HoC
import withAuth from './hocs/withAuth';

// pages
import Home from './pages/Home';
import ConditionsPage from './pages/ConditionsPage';
import ConsultPage from './pages/Consult';
import ContributePage from './pages/Contribute';
import ProposePage from './pages/Propose';
import CreateIdea from './pages/CreateIdeaPage';
import IdeaPage from './pages/IdeaPage';

// modal
import ModalRoot from './containers/ModalRoot';

import logo from './logo.svg';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ModalRoot />
                {/* TODO: improve Header handling wrapping pages with withoutHeader HoC (bug with react-router for now) */}
                <Switch>
                    <Route exact path="/atelier-des-idees" component={Home} />
                    <Route
                        exact
                        path="/atelier-des-idees/conditions-generales-utilisation"
                        component={ConditionsPage}
                    />
                    <Route exact path="/atelier-des-idees/soutenir" component={ConsultPage} />
                    <Route exact path="/atelier-des-idees/contribuer" component={ContributePage} />
                    <Route exact path="/atelier-des-idees/proposer" component={ProposePage} />
                    <Route exact path="/atelier-des-idees/creer-ma-proposition" component={withAuth(CreateIdea)} />
                    <Route exact path="/atelier-des-idees/proposition/:id" component={IdeaPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
