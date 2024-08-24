import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [
        Keycloak({
            clientId: process.env.AUTH_KEYCLOAK_CLIENID,
            clientSecret: "empty",
            issuer: `${process.env.AUTH_KEYCLOAK_HOST}/realms/${process.env.AUTH_KEYCLOAK_REALM}`,
            token: `${process.env.AUTH_KEYCLOAK_HOST}/realms/${process.env.AUTH_KEYCLOAK_REALM}/protocol/openid-connect/token`,
            userinfo: `${process.env.AUTH_KEYCLOAK_HOST}/realms/${process.env.AUTH_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
            authorization: `${process.env.AUTH_KEYCLOAK_HOST}/realms/${process.env.AUTH_KEYCLOAK_REALM}/protocol/openid-connect/auth`,
        })
    ],
    secret: "secret",
    callbacks: {
        async jwt({token, account, profile}) {
            if (account && account.id_token) {
                token.id_token = account.id_token as string;
            }
            return token;
        },
        async session({session, token}) {
            const mySession: cuSession = {
                ...session,
                id_token: token?.id_token as string
            } satisfies cuSession;
            return mySession;
        },
    },
})
