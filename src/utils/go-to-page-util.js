"use server";

import { redirect } from "next/navigation";

export default async function goToPage(path) {
    redirect(path);
}