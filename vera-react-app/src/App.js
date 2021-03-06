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
                id="Stress"
                title="Support"
                resources={
                    [
                        {
                            id: 'general-stress',
                            title: 'General Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                        {
                            id: 'chronic-stress',
                            title: 'Chronic Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                        {
                            id: 'chronic-stress',
                            title: 'Chronic Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                        {
                            id: 'chronic-stress',
                            title: 'Chronic Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                        {
                            id: 'chronic-stress',
                            title: 'Chronic Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                        {
                            id: 'chronic-stress',
                            title: 'Chronic Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                        {
                            id: 'chronic-stress',
                            title: 'Chronic Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                    ]
                }
            />
            <ResourcePageTileGroup
                id="finance"
                title="Financial Support"
                resources={
                    [
                        {
                            id: 'general-stress',
                            title: 'General Stress',
                            imageUrl: '----------insert an image url here -----------'
                        },
                        {
                            id: 'chronic-stress',
                            title: 'Chronic Stress',
                            imageUrl: '----------insert an image url here -----------'
                        }
                    ]
                }
            />
            <Footer/>
        </div>
    );
}

export default App;
