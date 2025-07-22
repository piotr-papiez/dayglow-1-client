"use client";

import { useActionState } from "react";

import handleSubmit from "@/lib/create-task.lib.js";

import styles from "./page.module.css";

import SubmitButton from "@/components/buttons/submit-button.component.jsx";
import CancelButton from "@/components/buttons/cancel-button.component.jsx";

export default function DeleteAccount() {
    const [actionHints, formAction] = useActionState(handleSubmit, []);
    console.log(actionHints);

    return (
        <section>
            <h3>Nowe zadanie</h3>
            <form action={formAction}>
                <div>
                    <input
                        id="title"
                        name="title"
                        placeholder="Tytuł"
                        type="text"
                        required
                    />
                </div>
                <div>
                    <textarea className={styles.textarea} id="description" name="description" placeholder="Opis"></textarea>
                </div>
                {actionHints.length > 0 && (actionHints.map(hint => <p key={hint}>{hint}</p>))}
                <div className="related-buttons-container">
                    <SubmitButton
                        defaultLabel="Stwórz zadanie"
                        pendingLabel="Tworzenie…"
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