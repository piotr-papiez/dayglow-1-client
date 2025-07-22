"use client";

import Link from "next/link";
import { useState, useActionState } from "react";

// import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import DoneIcon from "@mui/icons-material/Done";

import handleSubmit from "@/lib/register.lib.js";
import { MAIL_REGEX } from "@/utils/mail-regex.util";

import styles from "@/app/register/page.module.css";

import SubmitButton from "@/components/buttons/submit-button.component.jsx";

export default function RegisterForm() {
    const [input, setInput] = useState({
        name: "",
        mail: "",
        password: ""
    });

    const [actionHints, formAction] = useActionState(handleSubmit, []);

    function handleInput(event) {
        setInput(prevInput => ({
            ...prevInput,
            [event.target.name]: event.target.value
        }));
    }

    const isFormDataValid = {
        name: input.name.length >= 2,
        mail: MAIL_REGEX.test(input.mail),
        password: input.password.trim().length >= 5
    };

    return (
        <section>
            <h2>Tworzenie konta</h2>
            <form action={formAction}>
                <div>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Imię"
                        required
                        onChange={handleInput}
                        value={input.name}
                    />
                    <p className={`${styles.hint} ${isFormDataValid.name ? styles.success : ""}`}>
                        {isFormDataValid.name && <DoneIcon fontSize="small" />} Min. 2 znaki
                    </p>
                </div>
                <div>
                    <input
                        id="mail"
                        name="mail"
                        type="email"
                        placeholder="E-mail"
                        required
                        onChange={handleInput}
                        value={input.mail}
                    />
                    <p className={`${styles.hint} ${isFormDataValid.mail ? styles.success : ""}`}>
                    {isFormDataValid.mail && <DoneIcon fontSize="small" />} Format e-mail
                    </p>
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        placeholder="Hasło"
                        type="password"
                        required
                        onChange={handleInput}
                        value={input.password}
                    />
                    <p className={`${styles.hint} ${isFormDataValid.password ? styles.success : ""}`}>
                    {isFormDataValid.password && <DoneIcon fontSize="small" />} Min. 5 znaków
                    </p>
                </div>
                {actionHints.length > 0 && (actionHints.map(hint => <p key={hint}>{hint}</p>))}
                <SubmitButton
                    defaultLabel="Utwórz konto"
                    pendingLabel="Wysyłanie…"
                />
            </form>
            <Link
                className="tertiary-link"
                href="/login"
            >
                Zaloguj się
            </Link>
        </section>
    );
}