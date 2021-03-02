import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, ResourceTile} from './components/components';

function App() {
    return (
        <div id="app">
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>

            <Footer/>
        </div>
    );
}

export default App;
