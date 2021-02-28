import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, NavBar } from './components/components';

function App() {
    return (
        <div id="app">
            <NavBar/>
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
