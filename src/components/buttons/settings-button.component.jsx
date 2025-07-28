"use client";

import styles from "./settings-button.module.css";

import goToPage from "@/utils/go-to-page-util.js";

import SettingsIcon from "@mui/icons-material/Settings";

export default function SettingsButton() {
    return (
        <button
            className={styles["settings-button"]}
            onClick={() => {goToPage("/delete-account")}}
        >
            <SettingsIcon />
        </button>
    );
}