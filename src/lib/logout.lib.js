"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Logout() {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    redirect("/login");
}