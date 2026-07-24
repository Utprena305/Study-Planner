import { FaHome, FaTasks, FaClock, FaCalendarAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import logoImage from "../assets/images/logo_2.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };
  return (
    <aside className="sidebar">
        

      <div className="sidebar-logo">
        <img src={logoImage} alt="Logo" />
        <h2>Study Planner</h2>
      </div>

      <nav className="sidebar-menu">

        <button
            className={`sidebar-link ${
                location.pathname === "/dashboard" ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard")}
        >
            <FaHome />
            <span>Dashboard</span>
        </button>

        <button
            className={`sidebar-link ${
                location.pathname === "/tasks" ? "active" : ""
            }`}
            onClick={() => navigate("/tasks")}
        >
            <FaTasks />
            <span>Tasks</span>
        </button>

        <button
            className={`sidebar-link ${
                location.pathname === "/study-timer" ? "active" : ""
            }`}
            onClick={() => navigate("/study-timer")}
        >
            <FaClock />
            <span>Study Timer</span>
        </button>

        <button
            className={`sidebar-link ${
                location.pathname === "/schedule" ? "active" : ""
            }`}
            onClick={() => navigate("/schedule")}
        >
            <FaCalendarAlt />
            <span>Schedule</span>
        </button>

      </nav>

      <div className="sidebar-bottom">

        <a href="#">
          <FaCog />
          <span>Settings</span>
        </a>

        <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;