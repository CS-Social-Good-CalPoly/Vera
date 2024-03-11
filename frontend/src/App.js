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
import { ClerkProvider } from '@clerk/clerk-expo'

function App() {
    const [activeLink, setActiveLink] = useState(null)

    return (
        <ClerkProvider
            publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
        >
            <div id="app">
                <NavBar activeLink={activeLink} />
                <div id="page">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={() => (
                                <HomePage setActiveLink={setActiveLink} />
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
                            component={() => <IndividualResourcePage />}
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
                            path="/individualStory"
                            component={() => <IndividualStoryPage />}
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
                            component={() => <AdminPages />}
                        />
                    </Switch>
                </div>
                <Footer />
            </div>
        </ClerkProvider>
    )
}

export default App
