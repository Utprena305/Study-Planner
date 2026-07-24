import { useState } from "react";
import { deleteTask, updateTask } from "../service/Api";
import "../styles/TaskTable.css";

function TaskTable({
    tasks,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    setShowModal,
    setSelectedTask,
    fetchTasks
}) {
    const [openMenu, setOpenMenu] = useState(null);
    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
    );

            if (!confirmDelete) return;

            try {

                await deleteTask(id);

                await fetchTasks();

            } catch (error) {

                console.error(error);

                alert("Failed to delete task.");

            }

        };
        const handleToggle = async (task) => {

            try {

                const updatedStatus =
                    task.status === "Completed"
                        ? "To Do"
                        : "Completed";

                await updateTask(task.id, {

                    title: task.title,
                    description: task.description,
                    category: task.category,
                    priority: task.priority,
                    status: updatedStatus,
                    due_date: task.due_date

                });

                await fetchTasks();

            } catch (error) {

                console.error(error);

                alert("Failed to update task.");

            }

        };

    return (
        <div className="task-table-card">

            <div className="task-table-header">
        <div className="task-tabs">

    <button
        className={statusFilter === "All" ? "active" : ""}
        onClick={() => setStatusFilter("All")}
    >
        All Tasks
    </button>

    <button
        className={statusFilter === "To Do" ? "active" : ""}
        onClick={() => setStatusFilter("To Do")}
    >
        To Do
    </button>

    <button
        className={statusFilter === "In Progress" ? "active" : ""}
        onClick={() => setStatusFilter("In Progress")}
    >
        In Progress
    </button>

    <button
        className={statusFilter === "Completed" ? "active" : ""}
        onClick={() => setStatusFilter("Completed")}
    >
        Completed
    </button>

</div>

        <div className="task-actions">
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        <button
                className="add-task-btn"
                onClick={() => setShowModal(true)}
        >
                + Add Task
        </button>
        </div>

    </div>                
                
            <table className="task-table">

                <thead>
                    <tr>
                        <th></th>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {tasks.map((task) => (

                        <tr key={task.id}>

                            <td>
                                <input
                                    type="checkbox"
                                    checked={task.status === "Completed"}
                                    onChange={() => handleToggle(task)}
                                />
                            </td>

                            <td>

                                <h4>{task.title}</h4>

                                <div className="category-badge">
                                    {task.category}
                                </div>

                            </td>

                            <td>
                                <span className={`priority ${task.priority.toLowerCase()}`}>
                                    {task.priority}
                                </span>
                            </td>

                            <td>
                                {new Date(task.due_date).toLocaleDateString()}
                            </td>

                            <td>
                                <span
                                    className={`status ${task.status.replace(/\s+/g,"").toLowerCase()}`}
                                >
                                    {task.status}
                                </span>
                            </td>

                            
                                <td style={{ position: "relative" }}>
                                <button
                                    className="menu-btn"
                                    onClick={() =>
                                        setOpenMenu(openMenu === task.id ? null : task.id)
                                    }
                                >
                                    ⋮
                                </button>

                                {openMenu === task.id && (
                                    <div className="dropdown-menu">

                                        <button
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setShowModal(true);
                                                setOpenMenu(null);
                                            }}
                                        >
                                            ✏ Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                handleDelete(task.id);
                                                setOpenMenu(null);
                                            }}
                                        >
                                            🗑 Delete
                                        </button>

                                    </div>
                                )}
                            </td>
                            

                        </tr>

                    ))}

                </tbody>

            </table>                

        </div>

        
    );
}

export default TaskTable;