import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import { useLocation } from 'react-router-dom'

export const SignInPage = () => {
    const location = useLocation()

    const from = location.state?.from?.pathname || '/AdminPages'

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '75vh',
                paddingTop: '2rem', // ✅ add space at the top
                paddingBottom: '2rem', // ✅ add space at the bottom
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '28rem',
                    margin: '0 auto',
                }}
            >
                <SignIn path="/sign-in" routing="path" afterSignInUrl={from} />
            </div>
        </div>
    )
}
