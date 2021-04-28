import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, NavBar } from './components/components';

import StoryPopUp from './../src/components/StoryPopUp/StoryPopUp'

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="page">
                <Switch>
                <Route exact path='/'
                        component={() => <Home />} />
                <Route exact path='/StoryPopUp' component={() => <StoryPopUp/>}/>

                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
