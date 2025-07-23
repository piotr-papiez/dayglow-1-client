"use server";

import getTokenCookie from "./get-token-cookie.util.js";

const tokenValue = getTokenCookie();

export default async function fetchTasks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Cookie": `token=${tokenValue}`
            },
            credentials: "include"
        });

        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
    } catch (error) {
        console.log(error);
    }
}