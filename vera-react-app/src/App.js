import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Banner} from './components/components';

function App() {
    return (
        <div id="app">
            <Banner imageUrl="https://picsum.photos/1200/500"/>
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
        </div>
    );
}

export default App;
