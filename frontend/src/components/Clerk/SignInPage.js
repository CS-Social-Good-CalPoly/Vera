import React from 'react'
import { SignIn } from '@clerk/clerk-react'

export const SignInPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '75vh',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '28rem',
                    margin: '0 auto',
                }}
            >
                <SignIn
                    path="/sign-in"
                    routing="path"
                    afterSignInUrl="/AdminPages"
                />
            </div>
        </div>
    )
}
