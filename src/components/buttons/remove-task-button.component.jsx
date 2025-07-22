"use client";

import { useFormStatus } from "react-dom";

import styles from "./remove-task-button.module.css";

export default function RemoveButton({ defaultLabel, pendingLabel, removeTask, taskId }) {
    const { pending } = useFormStatus();

    return (
        <button className={styles["remove-button"]} disabled={pending} onClick={removeTask}>
            {pending ? pendingLabel : defaultLabel}
        </button>
    );
}