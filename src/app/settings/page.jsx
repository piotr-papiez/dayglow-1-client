"use client";

import Link from "next/link";

import AddIcon from "@mui/icons-material/ArrowBack";

import styles from "./page.module.css";

export default function Settings() {
    return (
        <>
            <Link
                className={`${styles.menu} ${styles["back-button"]}`}
                href={"/tasks"}
            >
                <AddIcon fontSize="small" />
            </Link>
            <h2 className={styles.heading}>Ustawienia</h2>
            <menu className={styles.menu}>
                <ul>
                    <li className={styles["setting-container"]}>
                        <Link
                            className={styles["setting-link"]}
                            href={"/delete-account"}
                        >
                            Usuń konto
                        </Link>
                    </li>
                </ul>
            </menu>
        </>
    );
}