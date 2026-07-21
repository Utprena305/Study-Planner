import { FaCalendarAlt } from "react-icons/fa";
import "../styles/TaskList.css";

function DeadlineList() {
  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Upcoming Deadlines</h2>
        <a href="#">View All</a>
      </div>

      <div className="list-item">
        <FaCalendarAlt className="calendar-icon" />
        <span>Web Development Assignment</span>
        <small>27 Jul</small>
      </div>

      <div className="list-item">
        <FaCalendarAlt className="calendar-icon" />
        <span>Software Engineering Report</span>
        <small>29 Jul</small>
      </div>

      <div className="list-item">
        <FaCalendarAlt className="calendar-icon" />
        <span>Database Lab</span>
        <small>31 Jul</small>
      </div>

      <div className="list-item">
        <FaCalendarAlt className="calendar-icon" />
        <span>Mobile App Project</span>
        <small>5 Aug</small>
      </div>
    </div>
  );
}

export default DeadlineList;