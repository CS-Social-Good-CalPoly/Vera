import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, NavBar } from './components/components';
import StoryBanner from './components/StoryBanner/storyBanner';

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="page">
                <Switch>
                <Route exact path='/'
                        component={() => <Home />} />
                </Switch>
    
                <StoryBanner/>
                
            </div>
            <Footer/>
        </div>
    );
}

export default App;
