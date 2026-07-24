import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskTable from "../components/TaskTable";

import AddTaskModal from "../components/AddTaskModal";
import { getTasks } from "../service/Api";
import "../styles/Tasks.css";

function Tasks() {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
    const fetchTasks = async () => {

    try {

        const response = await getTasks();

        setTasks(response.data);

    } catch (error) {

        console.error(error);

    }

};
useEffect(() => {

    fetchTasks();

}, []);
const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

    return matchesSearch && matchesStatus;
});
    return (
        <div className="tasks-container">

            <Sidebar />
            {showModal && (
                <AddTaskModal
                    setShowModal={setShowModal}
                    fetchTasks={fetchTasks}
                    selectedTask={selectedTask}
                />
            )}

            <div className="tasks-content">

                <Topbar showGreeting={false} />

                <div className="tasks-main">

                    <div className="left-section">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px"
                            }}
                        >

                            <div>

                                <h1>Tasks</h1>

                                <p>Manage your tasks efficiently.</p>

                            </div>

                            

                        </div>

                        <TaskTable
                            tasks={filteredTasks}
                            search={search}
                            setSearch={setSearch}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            setShowModal={setShowModal}
                            setSelectedTask={setSelectedTask}
                            fetchTasks={fetchTasks}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Tasks;