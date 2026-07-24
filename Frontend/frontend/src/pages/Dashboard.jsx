import { useState, useEffect } from "react";
import { getTaskSummary, getTasks } from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskList from "../components/TaskList";
import DeadlineList from "../components/DeadlineList";
import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaCalendarAlt
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import "../styles/Dashboard.css";

function Dashboard() {
    const [summary, setSummary] = useState({
        total: 0,
        completed: 0,
        in_progress: 0,
        todo: 0
    });
    const [tasks, setTasks] = useState([]);
    const fetchSummary = async () => {

        try {

            const response = await getTaskSummary();

            setSummary(response.data);

        } catch (error) {

            console.error(error);

        }

    };
    const fetchTasks = async () => {

    try {

        const response = await getTasks();

        setTasks(response.data);

    } catch (error) {

        console.error(error);

    }

};

    useEffect(() => {

        fetchSummary();
        fetchTasks();

    }, []);
    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar showGreeting={true} />

                <div className="dashboard-body">
                    <div className="stats-grid">

                        <StatCard
                            icon={<FaClipboardList />}
                            title="Total Tasks"
                            value={summary.total}
                            subtitle="All tasks"
                            color="#7c5cff"
                        />

                        <StatCard
                            icon={<FaCheckCircle />}
                            title="Completed"
                            value={summary.completed}
                            subtitle="Tasks done"
                            color="#27ae60"
                        />

                        <StatCard
                            icon={<FaClock />}
                            title="In Progress"
                            value={summary.in_progress}
                            subtitle="Keep going!"
                            color="#f39c12"
                        />

                        <StatCard
                            icon={<FaCalendarAlt />}
                            title="Upcoming"
                            value={
                                    tasks.filter(task => task.status !== "Completed").length
                                }
                            subtitle="Due soon"
                            color="#ff4f81"
                        />

                    </div>
                    <div className="list-grid">
                        <TaskList tasks={tasks} />
                        <DeadlineList tasks={tasks} />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;

