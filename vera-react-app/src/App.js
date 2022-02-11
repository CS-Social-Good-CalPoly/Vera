import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, StorySubmission, Footer, NavBar, ResourcePageTile} from './components/components';

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="page">
                <Switch>
                    {/* <Route exact path='/'
                           component={() => <Home />} /> */}
                    <Route exact path="/StorySubmission" component={() => <StorySubmission/>} />
                    <Route exact path='/'> 
                        <Redirect to="/StorySubmission"/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
