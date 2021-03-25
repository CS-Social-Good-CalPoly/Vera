import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer } from './components/components';
// import { Home, Footer, CategoryButtonGroup} from './components/components';

function App() {
    // const locations = ["this", "that", "this this"];
    // const name = ["name1", "name2", "name3"];
    return (
        <div id="app">
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            {/* <CategoryButtonGroup title="cool-title" locations={locations} names={name}/> */}
            <Footer/>
        </div>
    );
}

export default App;
