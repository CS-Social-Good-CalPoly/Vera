import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer} from './components/components';

function App() {
    const toExpect = ["Open to all cal poly students for walk in services", "Bring a backpack or reusable bags to carry food", "Assitance from a volunteer and information on additional resources"]
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
