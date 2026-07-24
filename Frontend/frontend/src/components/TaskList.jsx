import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/TaskList.css";

function TaskList({ tasks }) {

    const todayTasks = tasks.slice(0, 4);

    const formatDueDate = (date) => {

        if (!date) return "";

        const today = new Date();
        const due = new Date(date);

        const diff =
            Math.ceil(
                (due - today) /
                (1000 * 60 * 60 * 24)
            );

        if (diff === 0) return "Due Today";
        if (diff === 1) return "Tomorrow";

        return due.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short"
        });

    };

    return (

        <div className="list-card">

            <div className="list-header">

                <h2>Today's Tasks</h2>

                <Link to="/tasks">View All</Link>

            </div>

            {todayTasks.length === 0 ? (

    <div className="empty-state">
        <p>No tasks available.</p>
    </div>

) : (

    todayTasks.map((task) => (

        <div
            className="list-item"
            key={task.id}
        >

            {task.status === "Completed" ? (
                <FaCheckSquare className="task-icon completed" />
            ) : (
                <FaRegSquare className="task-icon" />
            )}

            <span>{task.title}</span>

            <small
                className={
                    task.status === "Completed"
                        ? "success"
                        : task.priority === "High"
                        ? "danger"
                        : task.priority === "Medium"
                        ? "warning"
                        : ""
                }
            >
                {task.status === "Completed"
                    ? "Completed"
                    : formatDueDate(task.due_date)}
            </small>

        </div>

    ))

)}

        </div>

    );

}

export default TaskList;