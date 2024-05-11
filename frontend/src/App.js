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
    LandingPage,
} from './pages/pages'

function App() {
    const [activeLink, setActiveLink] = useState(null)

    return (
        <div id="app">
            <NavBar activeLink={activeLink} />
            <div id="page">
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => (
                            <LandingPage />
                        )}
                    />
                    <Route
                        exact
                        path="/resources"
                        component={() => (
                            <HomePage setActiveLink={setActiveLink} />
                        )}
                    />
                    <Route
                        exact
                        path="/individualResource"
                        component={() => (
                            <IndividualResourcePage setActiveLink={setActiveLink} />
                        )}
                    />
                    <Route
                        exact
                        path="/stories"
                        render={() => (
                            <StoriesPage setActiveLink={setActiveLink} />
                        )}
                    />
                    <Route
                        exact
                        path="/individualStory/:id"
                        render={() => <IndividualStoryPage setActiveLink={setActiveLink} />}
                    />
                    <Route
                        exact
                        path="/storySubmission"
                        component={() => (
                            <StorySubmissionPage
                                setActiveLink={setActiveLink}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/AdminPages"
                        component={() => (
                            <AdminPages setActiveLink={setActiveLink} /> 
                        )}
                    />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default App
