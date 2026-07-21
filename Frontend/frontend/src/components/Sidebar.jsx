import { FaHome, FaTasks, FaClock, FaCalendarAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import logoImage from "../assets/images/logo_2.png";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

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

        <a href="#" className="active">
          <FaHome />
          <span>Dashboard</span>
        </a>

        <a href="#">
          <FaTasks />
          <span>Tasks</span>
        </a>

        <a href="#">
          <FaClock />
          <span>Study Timer</span>
        </a>

        <a href="#">
          <FaCalendarAlt />
          <span>Schedule</span>
        </a>

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