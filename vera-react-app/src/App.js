import './App.css';
import {Route, Switch} from 'react-router-dom';
import {Home, Footer} from './components/components';
import ResourcePageTileGroup from "./components/ResourcePageTileGroup/ResourcePageTileGroup";

function App() {
    return (
        <div id="app">
            <Switch>
                <Route exact path='/'
                       component={() => <Home/>}/>
            </Switch>
            <ResourcePageTileGroup
                    sectionTitle=" Support"
                    id="Stress"
                    imageUrls={["url one", "url two", "url 3", "url 3", "url 3", "url 3", "url 3", "url 3"]}
                    titles={["Stress1", "Stress2", "stress 3", "stress 3", "stress 3", "stress 3", "stress 3"]}
                    bodyText={["Stress body1", "Stress body2", "body 3", "body 3", "body 3", "body 3", "body 3"]}
                    links={["Stress Link1", "Stress Link2", "link 3", "link 3", "link 3", "link 3", "link 3"]}
                />
            <Footer/>
        </div>
    );
}

export default App;
