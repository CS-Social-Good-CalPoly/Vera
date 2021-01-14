import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, StoryBanner } from './components/components';

function App() {
    return (
        <div id="app">
            <StoryBanner imageUrl="https://dummyimage.com/300"/>
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
        </div>
    );
}

export default App;
