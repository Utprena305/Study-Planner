import { useState } from "react";
import { deleteSchedule } from "../service/Api";
import "../styles/TaskTable.css";

function ScheduleTable({
    schedules,
    setShowModal,
    setSelectedSchedule,
    fetchSchedules
}) {

    const [search, setSearch] = useState("");
    const [openMenu, setOpenMenu] = useState(null);

    const filteredSchedules = schedules.filter((schedule) =>
        schedule.subject.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this session?"
        );

        if (!confirmDelete) return;

        try {

            await deleteSchedule(id);

            fetchSchedules();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="task-table-card">

            <div className="task-table-header">

                <div>
                    <h3>Study Sessions</h3>
                </div>

                <div className="task-actions">

                    <input
                        type="text"
                        placeholder="Search session..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        className="add-task-btn"
                        onClick={() => {

                            setSelectedSchedule(null);
                            setShowModal(true);

                        }}
                    >
                        + Add Session
                    </button>

                </div>

            </div>

            <table className="task-table">

                <thead>

                    <tr>

                        <th>Subject</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Duration</th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {filteredSchedules.length > 0 ? (

                        filteredSchedules.map((schedule) => {

                            const start = new Date(`1970-01-01T${schedule.start_time}`);
                            const end = new Date(`1970-01-01T${schedule.end_time}`);

                            const duration =
                                (end - start) / (1000 * 60 * 60);

                            return (

                                <tr key={schedule.id}>

                                    <td>

                                        <h4>{schedule.subject}</h4>

                                    </td>

                                    <td>

                                        {new Date(schedule.session_date).toLocaleDateString(
                                            "en-US",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}

                                    </td>

                                    <td>

                                        {start.toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true
                                        })}

                                    </td>

                                    <td>

                                        {end.toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true
                                        })}

                                    </td>

                                    <td>

                                        {duration} hrs

                                    </td>

                                    <td style={{ position: "relative" }}>

                                        <button
                                            className="menu-btn"
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === schedule.id
                                                        ? null
                                                        : schedule.id
                                                )
                                            }
                                        >
                                            ⋮
                                        </button>

                                        {openMenu === schedule.id && (

                                            <div className="dropdown-menu">

                                                <button
                                                    onClick={() => {

                                                        setSelectedSchedule(schedule);

                                                        setShowModal(true);

                                                        setOpenMenu(null);

                                                    }}
                                                >
                                                    ✏ Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => {

                                                        handleDelete(schedule.id);

                                                        setOpenMenu(null);

                                                    }}
                                                >
                                                    🗑 Delete
                                                </button>

                                            </div>

                                        )}

                                    </td>

                                </tr>

                            );

                        })

                    ) : (

                        <tr>

                            <td
                                colSpan="6"
                                style={{
                                    textAlign: "center",
                                    padding: "40px"
                                }}
                            >
                                No study sessions found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ScheduleTable;