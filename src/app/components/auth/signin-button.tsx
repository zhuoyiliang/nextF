"use client"

import { signIn } from "next-auth/react"

export function SignIn() {
    return (
        <button onClick={() => signIn("keycloak", { redirectTo: "/" })}>
            Sign In
        </button>
    )
}