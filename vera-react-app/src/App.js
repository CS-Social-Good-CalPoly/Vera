import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Footer, NavBar } from './components/components';
import { HomePage, IndividualResourcePage, StoriesPage, StorySubmissionPage, IndividualStoryPage } from './pages/pages';

function App() {
    return (
        <div id="app">
            <div id="page">
                <Switch>
                    <Route exact path='/'
                           component={() => <HomePage />} />
                     <Route exact path='/resources'
                           component={() => <HomePage />} />
                    <Route exact path='/individualResource'
                           component={() => <IndividualResourcePage />} />
                    <Route exact path='/stories'
                           component={() => <StoriesPage />} />
                    <Route exact path='/individualStory'
                           component={() => <IndividualStoryPage />} />
                    <Route exact path='/storySubmission'
                           component={() => <StorySubmissionPage />} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
