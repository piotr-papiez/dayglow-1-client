"use server";

// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import getTokenCookie from "@/utils/get-token-cookie.util.js";

export default async function handleSubmit(prevState, formData) {
    const title = formData.get("title");
    const description = formData.get("description");

    const task = { title };

    if (description) task.description = description;

    const inputHints = [];

    const tokenValue = await getTokenCookie();

    // if (inputHints.length > 0) return inputHints;

    const response = await createTask(task, tokenValue);

    if (response.status === 400) {
        inputHints.push("Niewłaściwe dane zadania.");
        return inputHints;
    } else if (response.status === 401) {
        inputHints.push("Brak uprawnień do stworzenia zadania. Zaloguj się i spróbuj ponownie.");
        return inputHints;
    } else if (response.status === 409) {
        inputHints.push("To zadanie już istnieje.");
        return inputHints;
    } else if (response.status === 201) {
        // revalidatePath("/tasks");
        redirect("/tasks");
    } else {
        inputHints.push("Wystąpił błąd podczas tworzenia zadania. Odśwież stronę i spróbuj ponownie.");
        return inputHints;
    }
}

async function createTask(task, tokenValue) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenValue}`
            },
            credentials: "include",
            body: JSON.stringify(task)
        });

        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}