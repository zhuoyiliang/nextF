"use server";

import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";
import axios from "axios";


export async function PUT(req: NextRequest) {
    const session = (await auth()) as cuSession;
    if (!session?.id_token) {
        return NextResponse.json(
            {message: "session.id_token is empty!!"},
            {status: 412}
        );
    }

    try {
        await axios.get(`${process.env.AUTH_KEYCLOAK_HOST}/realms/${process.env.AUTH_KEYCLOAK_REALM}/protocol/openid-connect/logout`, {
            params: {
                id_token_hint: session.id_token,
                clientId: "front_app"
            }
        });
        return NextResponse.json(
            {message: "keycloak logout success"},
            {status: 200}
        );
    } catch (e: any) {
        return NextResponse.json(
            {message: e?.message},
            {status: 417}
        );
    }
}
