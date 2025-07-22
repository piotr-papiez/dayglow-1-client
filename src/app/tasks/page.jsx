"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

import removeTask from "@/lib/remove-task.lib.js";

import styles from "./page.module.css";

import LogoutButton from "@/components/buttons/logout-button.component.jsx";
import RemoveButton from "@/components/buttons/remove-task-button.component.jsx";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch("http://localhost:3000/api/tasks", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

                const fetchedTasks = await response.json();
                setTasks(fetchedTasks);
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
            <LogoutButton />
            <h2 className={styles.heading}>Twoja lista zadań</h2>
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