import './App.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Footer, NavBar } from './components/components.js'
import { useState } from 'react'
import {
    ResourcePage,
    IndividualResourcePage,
    StoriesPage,
    StorySubmissionPage,
    IndividualStoryPage,
    AdminPages,
    AboutPage,
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
                            <AboutPage setActiveLink={setActiveLink} />
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
                        path="/individualResource/:id"
                        render={() => (
                            <IndividualResourcePage
                                setActiveLink={setActiveLink}
                            />
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
                    <Route
                        exact
                        path="/AdminPages"
                        component={() => (
                            <AdminPages setActiveLink={setActiveLink} />
                        )}
                    />
                </Switch>
            </div>
            <Footer activeLink={activeLink} />
        </div>
    )
}

export default App
