"use server";

import { redirect } from "next/navigation";

import { MAIL_REGEX } from "@/utils/mail-regex.util";

export default async function handleSubmit(prevState, formData) {
    const user = {
        name: formData.get("name"),
        mail: formData.get("mail"),
        password: formData.get("password")
    };

    const inputHints = [];

    if (user.name.length < 2) inputHints.push("Imię powinno mieć min. 2 znaki");
    if (!MAIL_REGEX.test(user.mail)) inputHints.push("Wprowadź właściwy adres e-mail");
    if (user.password.length < 5) inputHints.push("Hasło powinno mieć min. 5 znaków");

    if (inputHints.length > 0) return inputHints;

    const response = await registerUser(user);

    if (response.status === 400) {
        inputHints.push("Niewłaściwy format danych w formularzu.");
        return inputHints;
    } else if (response.status === 409) {
        inputHints.push("Ten e-mail jest już zajęty.");
        return inputHints;
    } else if (response.status === 201) {
        redirect("/");
    } else {
        inputHints.push("Wystąpił błąd podczas rejestracji. Odśwież stronę i spróbuj ponownie.");
        return inputHints;
    }
}

async function registerUser(user) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
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