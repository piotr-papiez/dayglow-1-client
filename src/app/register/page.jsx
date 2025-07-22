import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/register-form.component.jsx";

export default async function LoginPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token) redirect("/tasks");

    return (
        <RegisterForm />
    );
}