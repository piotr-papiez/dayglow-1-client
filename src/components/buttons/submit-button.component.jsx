"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ defaultLabel, pendingLabel }) {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? pendingLabel : defaultLabel}
        </button>
    );
}