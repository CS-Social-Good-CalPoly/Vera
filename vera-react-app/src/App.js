import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home} from './components/components';
import { Footer } from './components/components';

function App() {
    return (
        <div id="app">
            Insert Nav Bar Here
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
