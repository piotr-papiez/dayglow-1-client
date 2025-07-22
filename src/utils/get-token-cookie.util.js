"use server";

import { cookies } from "next/headers";

export default async function getTokenCookie() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const tokenValue = tokenCookie?.value;

    return tokenValue;
}