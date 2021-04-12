import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer } from './components/components';

import StoryPopUp from './../src/components/StoryPopUp/StoryPopUp'

function App() {
    return (
        <div id="app">
            <Switch>
                <Route exact path='/StoryPopUp' component={() => <StoryPopUp/>}/>
                <Route exact path='/' component={() => <Home/>}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
