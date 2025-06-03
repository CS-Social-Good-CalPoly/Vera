import './App.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Footer, NavBar } from './components/components.js'
import { useState } from 'react'
import { ProtectedRoute } from './components/Clerk/ProtectedRoute.js'
import { SignInPage } from './components/Clerk/SignInPage.js'
import {
    ResourcePage,
    StoriesPage,
    StorySubmissionPage,
    IndividualStoryPage,
    AdminPages,
    AdminResourcesPage,
    AboutPage,
    HomePage,
} from './pages/pages.js'

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
                            <HomePage setActiveLink={setActiveLink} />
                        )}
                    />
                    <Route
                        exact
                        path="/about"
                        component={() => (
                            <AboutPage setActiveLink={setActiveLink} />
                        )}
                    />
                    <Route
                        exact
                        path="/resources"
                        component={() => (
                            <ResourcePage setActiveLink={setActiveLink} />
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
                        render={() => (
                            <IndividualStoryPage
                                setActiveLink={setActiveLink}
                            />
                        )}
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
                    <ProtectedRoute
                        exact
                        path="/AdminPages"
                        component={() => (
                            <AdminPages setActiveLink={setActiveLink} />
                        )}
                    />
                    <ProtectedRoute
                        exact
                        path="/AdminPages/resources"
                        component={() => (
                            <AdminResourcesPage setActiveLink={setActiveLink} />
                        )}
                    />
                    <Route
                        exact
                        path="/sign-in"
                        component={() => <SignInPage />}
                    />
                </Switch>
            </div>
            <Footer activeLink={activeLink} />
        </div>
    )
}

export default App
