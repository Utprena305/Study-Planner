import { useState, useEffect } from "react";
import { addTask, updateTask } from "../service/Api";
import "../styles/AddTaskModal.css";

function AddTaskModal({
    setShowModal,
    fetchTasks,
    selectedTask
}) {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [status, setStatus] = useState("To Do");

    const [dueDate, setDueDate] = useState("");
    
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const taskData = {
    title,
    description,
    category,
    priority,
    status,
    due_date: dueDate
};

if (selectedTask) {
    await updateTask(selectedTask.id, taskData);
} else {
    await addTask(taskData);
}

await fetchTasks();
setShowModal(false);

            await fetchTasks();

            setShowModal(false);

        } catch (error) {
            console.error("Full error:", error);

            if (error.response) {
                console.log("Response:", error.response.data);
                console.log("Status:", error.response.status);
            }

            alert("Failed to add task.");
        }

    };

    useEffect(() => {

    if (selectedTask) {

        setTitle(selectedTask.title);
        setDescription(selectedTask.description);
        setCategory(selectedTask.category);
        setPriority(selectedTask.priority);
        setStatus(selectedTask.status);
        setDueDate(selectedTask.due_date);

    }

}, [selectedTask]);

    return (

    <div className="modal-overlay">

        <div className="modal">

            <h2>Update Task</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Task Title</label>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="form-group">

                    <label>Category</label>
                    <input
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Priority</label>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Status</label>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Due Date</label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>

                    <button type="submit">
                        {selectedTask ? "Update Task" : "Save Task"}
                    </button>

                </div>

            </form>

        </div>

    </div>

);

}

export default AddTaskModal;