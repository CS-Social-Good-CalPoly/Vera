import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Redirect, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isLoaded, isSignedIn } = useUser()
    const location = useLocation()

    return (
        <Route
            {...rest}
            render={(props) =>
                !isLoaded ? (
                    <div>Loading...</div>
                ) : isSignedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/sign-in',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}
