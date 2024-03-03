import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Footer, NavBar } from './components/components'
import { useState } from 'react'
import {
    HomePage,
    IndividualResourcePage,
    StoriesPage,
    StorySubmissionPage,
    IndividualStoryPage,
    AdminPages,
} from './pages/pages'

function App() {
    const [activeLink, setActiveLink] = useState(null)

    return (
        <div id="app">
            <NavBar activeLink={activeLink} />
            <div id="page">
                <Switch>
                    <Route exact path="/" component={() => <HomePage />} />
                    <Route
                        exact
                        path="/resources"
                        render={(props) => (
                            <HomePage
                                {...props}
                                setActiveLink={setActiveLink}
                            />
                        )}
                        // component={() => <HomePage />}
                    />
                    <Route
                        exact
                        path="/individualResource"
                        component={() => <IndividualResourcePage />}
                    />
                    <Route
                        exact
                        path="/stories"
                        render={(props) => (
                            <StoriesPage
                                {...props}
                                setActiveLink={setActiveLink}
                            />
                        )}
                        // component={() => <StoriesPage />}
                    />
                    <Route
                        exact
                        path="/individualStory"
                        component={() => <IndividualStoryPage />}
                    />
                    <Route
                        exact
                        path="/storySubmission"
                        render={(props) => (
                            <StorySubmissionPage
                                {...props}
                                setActiveLink={setActiveLink}
                            />
                        )}
                        // component={() => <StorySubmissionPage />}
                    />
                    <Route
                        exact
                        path="/AdminPages"
                        component={() => <AdminPages />}
                    />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default App
