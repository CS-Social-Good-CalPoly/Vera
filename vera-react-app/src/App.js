import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, CategoryButtonGroup} from './components/components';

function App() {
    const locations = ["this", "that", "this this", "that that", "this that", "that this", "t", "h", "i", "s"];
    const name = ["name1", "name2", "name3", "name4", "name5", "name6", "name7", "name8", "name9", "name10"];
    return (
        <div id="app">
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            <CategoryButtonGroup title="cool-title" locations={locations} names={name}/>
            <Footer/>
        </div>
    );
}

export default App;
