"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import getTokenCookie from "@/utils/get-token-cookie.util.js";

export default async function handleSubmit(prevState, formData) {
    const user = {
        password: formData.get("password")
    };

    const inputHints = [];

    const cookieStore = await cookies();

    const tokenValue = await getTokenCookie();

    // if (user.password.length === 0) inputHints.push("Wpisz hasło");

    // if (inputHints.length > 0) return inputHints;

    const response = await deleteAccount(user, tokenValue);

    if (response.status === 401) {
        inputHints.push("Niewłaściwe hasło albo konto nie istnieje");
        return inputHints;
    } else if (response.status === 204) {
        cookieStore.delete("token");
        redirect("/");
    } else {
        inputHints.push("Wystąpił błąd podczas usuwania konta. Odśwież stronę i spróbuj ponownie.");
        return inputHints;
    }
}

async function deleteAccount(user, tokenValue) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete-account`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenValue}`
            },
            credentials: "include",
            body: JSON.stringify(user)
        });

        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}