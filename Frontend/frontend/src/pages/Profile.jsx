import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { updateProfile } from "../service/Api";
import "../styles/Profile.css";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [fullname, setFullname] = useState(user.fullname);
    const [email] = useState(user.email);

    const handleSave = async () => {

        try {

            const response = await updateProfile({
                fullname
            });

            const updatedUser = {
                ...user,
                fullname: response.data.user.fullname
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            alert("Profile updated successfully!");

            window.location.reload();

        } catch (error) {

            console.error(error);
            alert("Failed to update profile.");

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar showGreeting={false} />

                <div className="dashboard-body">

                    <div className="profile-card">

                        <div className="profile-avatar">
                            {fullname.charAt(0).toUpperCase()}
                        </div>

                        <h2>My Profile</h2>

                        <div className="form-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                value={fullname}
                                onChange={(e) =>
                                    setFullname(e.target.value)
                                }
                            />

                        </div>

                        <div className="form-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                value={email}
                                disabled
                            />

                            <small>
                                Email cannot be changed.
                            </small>

                        </div>

                        <button
                            className="save-btn"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;