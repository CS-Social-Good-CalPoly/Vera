import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home, Footer, ResourcePageTile} from './components/components';

function App() {
    return (
        <div id="app">
            <Switch>
               <Route exact path='/'
                 component={() => <Home />} />
            </Switch>
            <Footer/>
            <ResourcePageTile resourcePageLink="/Resources" title="General Stress" info="Stress is a feeling of emotional or physical tension. It can come from any event or thought that makes you you feel frustrated, angry..." />
        </div>
    );
}

export default App;
