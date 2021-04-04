import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer} from './components/components';

function App() {
    return (
        <div id="app">
            <div id="page">
                <Switch>
                <Route exact path='/'
                        component={() => <Home />} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
