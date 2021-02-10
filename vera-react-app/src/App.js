import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, StoryBanner} from './components/components';

function App() {
    return (
        <div id="app">
            <StoryBanner imageUrl={"https://www.picsum.photos/300"}/>
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
