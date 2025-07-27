"use server";

import getTokenCookie from "@/utils/get-token-cookie.util.js";

export default async function removeTask(taskId) {
    try {
        const tokenValue = await getTokenCookie();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/remove-task`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenValue}`
            },
            credentials: "include",
            body: JSON.stringify({ taskId })
        });

        // IF block to be updated

        if (response.status === 401) {
            return false;
        } else if (response.status === 404) {
            return false;
        } else if (response.status === 403) {
            return false;
        } else if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}