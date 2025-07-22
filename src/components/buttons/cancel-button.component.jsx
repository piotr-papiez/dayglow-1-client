"use client";

import { redirect } from "next/navigation";

export default function CancelButton({ defaultLabel, href }) {
    return (
        <button
            className="button-second"
            onClick={() => redirect(href)}
            type="button"
        >
            {defaultLabel}
        </button>
    );
}