import './App.css';
import { Route, Switch } from 'react-router-dom';
// import { Home, Footer, NavBar, ResourcePageTile} from './components/components';
import { IndividualResourcePage, Footer, NavBar, ResourcePageTile} from './components/components';

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="page">
                <Switch>
                    <Route exact path='/'
                           component={() => <IndividualResourcePage />} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
