import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaChevronDown, FaUser } from "react-icons/fa";
import "../styles/Topbar.css";

function Topbar({ showGreeting = true }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const firstName = user.fullname.split(" ")[0];
    const hour = new Date().getHours();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);
    useEffect(() => {

    const handleClickOutside = (event) => {

        if (
            menuRef.current &&
            !menuRef.current.contains(event.target)
        ) {
            setShowMenu(false);
        }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

}, []);

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (
        <header
            className="topbar"
            style={{
                justifyContent: showGreeting ? "space-between" : "flex-end"
            }}
        >

            {showGreeting && (
                <div>
                    <h1>{greeting}, {firstName} 👋</h1>
                    <p>Stay focused and achieve your goals!</p>
                </div>
            )}

            <div className="topbar-right">

                

                <div className="profile-wrapper"
                    ref={menuRef}>

                    <div
                        className="profile-section"
                        onClick={() => setShowMenu(!showMenu)}
                    >

                        <div className="avatar">
                            {firstName.charAt(0).toUpperCase()}
                        </div>

                        <span>{firstName}</span>

                        <FaChevronDown />

                    </div>

                    {showMenu && (
                        <div className="profile-menu">

                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    navigate("/profile");
                                }}
                            >
                                <FaUser />
                                Edit Profile
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Topbar;