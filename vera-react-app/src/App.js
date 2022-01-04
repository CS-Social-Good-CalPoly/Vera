import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, NavBar, ResourcePageTile } from './components/components';
import StoryBanner from './components/StoryBanner/storyBanner';
import photo from "./components/StoryBanner/photo.jpg";

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="page">
                <Switch>
                    <Route exact path='/'
                           component={() => <Home />} />
                </Switch>
    
                <StoryBanner
                    imageUrl = {photo} 
                />
                
            </div>
            <Footer/>
        </div>
    );
}

export default App;
