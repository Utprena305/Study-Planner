import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/TaskList.css";

function DeadlineList({ tasks }) {

    const upcoming = tasks
        .filter(
            task =>
                task.status !== "Completed"
        )
        .sort(
            (a, b) =>
                new Date(a.due_date) -
                new Date(b.due_date)
        )
        .slice(0, 4);

    return (

        <div className="list-card">

            <div className="list-header">

                <h2>Upcoming Deadlines</h2>

                <Link to="/tasks">View All</Link>

            </div>

            {upcoming.length === 0 ? (

    <div className="empty-state">
        <p>No upcoming deadlines.</p>
    </div>

) : (

    upcoming.map((task) => (

        <div
            className="list-item"
            key={task.id}
        >

            <FaCalendarAlt className="calendar-icon" />

            <span>{task.title}</span>

            <small>
                {new Date(task.due_date).toLocaleDateString(
                    "en-GB",
                    {
                        day: "numeric",
                        month: "short"
                    }
                )}
            </small>

        </div>

    ))

)}

        </div>

    );

}

export default DeadlineList;