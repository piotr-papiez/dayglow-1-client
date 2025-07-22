"use client";

import Link from "next/link";
import { useActionState } from "react";

import handleSubmit from "@/lib/login.lib.js";

import SubmitButton from "@/components/buttons/submit-button.component.jsx";

export default function LoginForm() {
    const [actionHints, formAction] = useActionState(handleSubmit, []);
    console.log(actionHints);

    return (
        <section>
            <h2>Logowanie</h2>
            <form action={formAction}>
                <div>
                    <input
                        id="mail"
                        name="mail"
                        placeholder="E-mail"
                        type="email"
                        required
                    />
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        placeholder="Hasło"
                        type="password"
                        required
                    />
                </div>
                {actionHints.length > 0 && (actionHints.map(hint => <p key={hint}>{hint}</p>))}
                <SubmitButton
                    defaultLabel="Zaloguj się"
                    pendingLabel="Logowanie…"
                />
            </form>
            <Link
                className="tertiary-link"
                href="/register"
            >
                Utwórz konto
            </Link>
        </section>
    );
}