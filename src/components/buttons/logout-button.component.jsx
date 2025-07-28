"use client";

import Logout from "@/lib/logout.lib.js";

import styles from "./logout-button.module.css";

import PowerIcon from "@mui/icons-material/PowerSettingsNew";

export default function LogoutButton() {
    return (
        <button className={styles["logout-button"]} onClick={Logout} >
            <PowerIcon />
        </button>
    );
}