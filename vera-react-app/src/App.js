import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, ResourceTile} from './components/components';

function App() {
    const toExpect1 = ["the quick brown fox jumps over the lazy dog. the quick brown fox jumps over the lazy dog.", "two", "three four five six"]
    const toExpect = ["One", "two", "three"]
    const openHours = ["Monday - Friday 8:00am - 5:00pm", "Saturday - Sunday 10:00am - 3:00pm"]
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
