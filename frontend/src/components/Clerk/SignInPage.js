import React from 'react'
import { SignIn } from '@clerk/clerk-react'

export const SignInPage = () => {
    return (
        <SignIn path="/sign-in" routing="path" afterSignInUrl="/AdminPages" />
    )
}
