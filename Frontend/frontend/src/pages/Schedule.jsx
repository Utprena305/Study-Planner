import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import ScheduleTable from "../components/ScheduleTable";
import ScheduleSummary from "../components/ScheduleSummary";
import StatCard from "../components/StatCard";

import { getSchedules } from "../service/Api";
import AddScheduleModal from "../components/AddScheduleModal";

import "../styles/Tasks.css";

function Schedule() {

    const [showModal, setShowModal] = useState(false);

    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const [schedules, setSchedules] = useState([]);

    const totalStudyHours = schedules.reduce((total, schedule) => {

    const start = new Date(`1970-01-01T${schedule.start_time}`);
    const end = new Date(`1970-01-01T${schedule.end_time}`);

    return total + (end - start) / (1000 * 60 * 60);

}, 0);

    const fetchSchedules = async () => {

        try {

            const response = await getSchedules();

            setSchedules(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchSchedules();

    }, []);

    return (

        <div className="tasks-container">

            <Sidebar />
            {showModal && (
                <AddScheduleModal
                    setShowModal={setShowModal}
                    fetchSchedules={fetchSchedules}
                    selectedSchedule={selectedSchedule}

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

                                <h2>Schedule</h2>

                                <p>Manage your study sessions</p>

                            </div>

                            

                        </div>
                        <div className="stats-grid">

    <StatCard
        icon="📚"
        title="Total Sessions"
        value={schedules.length}
        subtitle="All Sessions"
        color="#6C4CF1"
    />

    <StatCard
        icon="⏰"
        title="Study Hours"
        value={`${totalStudyHours} hrs`}
        subtitle="Total Study Time"
        color="#FF9800"
    />

</div>

                        <ScheduleTable
                            schedules={schedules}
                            setShowModal={setShowModal}
                            setSelectedSchedule={setSelectedSchedule}
                            fetchSchedules={fetchSchedules}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Schedule;