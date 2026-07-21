import { FaBell, FaChevronDown } from "react-icons/fa";
import "../styles/Topbar.css";

function Topbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const firstName = user.fullname.split(" ")[0];
    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (
        <header className="topbar">

            <div>
                <h1>{greeting}, {firstName} 👋</h1>
                <p>Stay focused and achieve your goals!</p>
            </div>

            <div className="topbar-right">

                <FaBell className="bell-icon"/>

                <div className="profile">

                    <div className="avatar">
                        U
                    </div>

                    <span>{firstName}</span>

                    <FaChevronDown/>

                </div>

            </div>

        </header>
    );
}

export default Topbar;