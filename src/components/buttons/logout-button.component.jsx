"use client";

import Logout from "@/lib/logout.lib.js";

import styles from "./logout-button.module.css";

export default function LogoutButton() {
    return (
        <button className={styles["logout-button"]} onClick={Logout} >
            Wyloguj
        </button>
    );
}