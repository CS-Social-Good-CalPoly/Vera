import './App.css';
import {Route, Switch} from 'react-router-dom';
import {Footer, Home, NavBar} from './components/components';

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="content">
                <Switch>
                    <Route exact path='/'
                           component={() => <Home/>}/>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
