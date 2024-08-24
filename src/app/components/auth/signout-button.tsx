"use client"

import {signOut} from "next-auth/react"

export function SignOut() {

    const logout = async () => {
        // keycloak
        await signOut()
    }

    return <button onClick={logout}>Sign Out</button>
}