"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

import { NameContext } from "../../../context/name.context";
import removeTask from "@/lib/remove-task.lib.js";

import styles from "./page.module.css";

import SettingsButton from "@/components/buttons/settings-button.component";
import LogoutButton from "@/components/buttons/logout-button.component.jsx";
import RemoveButton from "@/components/buttons/remove-task-button.component.jsx";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const { name, setName } = useContext(NameContext);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

                const { tasks, name } = await response.json();
                setTasks(tasks);
                setName(name);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTasks();
    }, []);

    async function handleRemove(taskId) {
        const response = await removeTask(taskId);
        console.log(response, taskId);

        if (response) setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    }

    return (
        <>
            <div className={styles["tools-container"]}>
                <SettingsButton />
                <LogoutButton />
            </div>
            <h2 className={styles.heading}>Cześć, {name}!</h2>
            <section className={styles.section}>
                {tasks.length > 0 && (
                    tasks.map(task => (
                        <div className={styles["task-container"]} key={`${task._id}-div`}>
                            <div key={`${task._id}-task`}>
                                <h3>{task.title}</h3>
                                <p className={styles["description-content"]}>{task.description}</p>
                            </div>
                            <RemoveButton
                                defaultLabel={<DoneIcon fontSize="small" />}
                                key={`${task._id}-remove-button`}
                                pendingLabel="Kończenie…"
                                removeTask={() => handleRemove(task._id)}
                                taskId={task._id}
                            />
                        </div>
                    ))
                )}
            </section>

            <Link
                className={`${styles.section} ${styles["add-button"]}`}
                href={"/create-task"}
            >
                <AddIcon fontSize="medium" />
            </Link>
        </>
    );
}