import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, NavBar, ResourcePageTile, TestingStoryPopUp} from './components/components';

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="page">
                <Switch>
                    <Route exact path='/'
                           component={() => <TestingStoryPopUp />} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
