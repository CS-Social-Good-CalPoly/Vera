import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Footer, NavBar } from './components/components';
import { HomePage, IndividualResourcePage, StoriesPage, StorySubmissionPage, IndividualStoryPage } from './pages/pages';

function App() {
    return (
        <div id="app">
            <NavBar/>
            <div id="page">
                <Switch>
                    <Route exact path='/'
                           component={() => <HomePage />} />
                     <Route exact path='/resources'
                           component={() => <HomePage />} />
                    <Route exact path='/individualresource'
                           component={() => <IndividualResourcePage />} />
                    <Route exact path='/stories'
                           component={() => <StoriesPage />} />
                    <Route exact path='/individualstory'
                           component={() => <IndividualStoryPage />} />
                    <Route exact path='/shareStory'
                           component={() => <StorySubmissionPage />} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
