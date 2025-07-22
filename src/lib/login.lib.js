"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function handleSubmit(prevState, formData) {
    const user = {
        mail: formData.get("mail"),
        password: formData.get("password")
    };

    const inputHints = [];

    // if (user.mail.length === 0) inputHints.push("Wpisz adres e-mail");
    // if (user.password.length === 0) inputHints.push("Wpisz hasło");

    // if (inputHints.length > 0) return inputHints;

    const response = await loginUser(user);

    const tokenHeader = response.headers.get("set-cookie");

    if (tokenHeader) {
        const [tokenKey, tokenValue] = tokenHeader.split(";")[0].split("=");
        
        const cookieStore = await cookies();

        cookieStore.set(tokenKey, tokenValue, {
            path: "/",
            httpOnly: true
            // More to be added
        });
    }

    if (response.status === 400 || response.status === 401) {
        inputHints.push("Niewłaściwy login lub hasło");
        return inputHints;
    } else if (response.status === 200) {
        redirect("/tasks");
    } else {
        inputHints.push("Wystąpił błąd podczas logowania. Odśwież stronę i spróbuj ponownie.");
        return inputHints;
    }
}

async function loginUser(user) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(user)
        });

        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}