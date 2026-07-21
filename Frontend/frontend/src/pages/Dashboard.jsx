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
    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="dashboard-body">
                    <div className="stats-grid">

                        <StatCard
                            icon={<FaClipboardList />}
                            title="Total Tasks"
                            value="12"
                            subtitle="All tasks"
                            color="#7c5cff"
                        />

                        <StatCard
                            icon={<FaCheckCircle />}
                            title="Completed"
                            value="5"
                            subtitle="Tasks done"
                            color="#27ae60"
                        />

                        <StatCard
                            icon={<FaClock />}
                            title="In Progress"
                            value="3"
                            subtitle="Keep going!"
                            color="#f39c12"
                        />

                        <StatCard
                            icon={<FaCalendarAlt />}
                            title="Upcoming"
                            value="4"
                            subtitle="Due soon"
                            color="#ff4f81"
                        />

                    </div>
                    <div className="list-grid">
                        <TaskList />
                        <DeadlineList />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;