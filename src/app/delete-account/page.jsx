"use client";

import { useActionState } from "react";

import handleSubmit from "@/lib/delete-account.lib.js";

import SubmitButton from "@/components/buttons/submit-button.component.jsx";
import CancelButton from "@/components/buttons/cancel-button.component.jsx";

export default function DeleteAccount() {
    const [actionHints, formAction] = useActionState(handleSubmit, []);
    console.log(actionHints);

    return (
        <section>
            <h2>Usuwanie konta</h2>
            <form action={formAction}>
                <div>
                    <input
                        id="password"
                        name="password"
                        placeholder="Wpisz hasło, aby usunąć konto"
                        type="password"
                        required
                    />
                </div>
                {actionHints.length > 0 && (actionHints.map(hint => <p key={hint}>{hint}</p>))}
                <div className="related-buttons-container">
                    <SubmitButton
                        defaultLabel="Usuń bezpowrotnie"
                        pendingLabel="Usuwanie…"
                    />
                    <CancelButton
                        defaultLabel="Anuluj"
                        href="/tasks"
                    />
                </div>
            </form>
        </section>
    );
}