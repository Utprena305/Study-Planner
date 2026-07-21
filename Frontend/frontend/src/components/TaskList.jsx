import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import "../styles/TaskList.css";

function TaskList() {
  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Today's Tasks</h2>
        <a href="#">View All</a>
      </div>

      <div className="list-item">
        <FaRegSquare className="task-icon" />
        <span>Web Development Assignment</span>
        <small className="danger">Due Today</small>
      </div>

      <div className="list-item">
        <FaCheckSquare className="task-icon completed" />
        <span>Kotlin Programming Practice</span>
        <small className="success">Completed</small>
      </div>

      <div className="list-item">
        <FaRegSquare className="task-icon" />
        <span>Study React</span>
        <small className="warning">Tomorrow</small>
      </div>

      <div className="list-item">
        <FaRegSquare className="task-icon" />
        <span>Database Revision</span>
        <small>27 July</small>
      </div>
    </div>
  );
}

export default TaskList;