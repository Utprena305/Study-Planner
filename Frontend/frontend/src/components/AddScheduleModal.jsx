import { useState, useEffect } from "react";
import "../styles/AddScheduleModal.css";
import { addSchedule, updateSchedule } from "../service/Api";


function AddScheduleModal({ setShowModal, fetchSchedules, selectedSchedule }) {

    const [subject, setSubject] = useState("");
    const [sessionDate, setSessionDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (selectedSchedule) {

                await updateSchedule(selectedSchedule.id, {
                    subject,
                    session_date: sessionDate,
                    start_time: startTime,
                    end_time: endTime
                });

            } else {

                await addSchedule({
                    subject,
                    session_date: sessionDate,
                    start_time: startTime,
                    end_time: endTime
                });

            }

            fetchSchedules();

            setShowModal(false);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

    if (selectedSchedule) {

        setSubject(selectedSchedule.subject);
        setSessionDate(selectedSchedule.session_date.split("T")[0]);
        setStartTime(selectedSchedule.start_time.slice(0, 5));
        setEndTime(selectedSchedule.end_time.slice(0, 5));

    } else {

        setSubject("");
        setSessionDate("");
        setStartTime("");
        setEndTime("");

    }

}, [selectedSchedule]);

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    {selectedSchedule ? "Edit Study Session" : "Add Study Session"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Subject</label>

                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject"
                        />

                    </div>

                    <div className="form-group">

                        <label>Date</label>

                        <input
                            type="date"
                            value={sessionDate}
                            onChange={(e) => setSessionDate(e.target.value)}
                            required
                        />

                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px"
                        }}
                    >

                        <div className="form-group" style={{ flex: 1 }}>

                            <label>Start Time</label>

                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />

                        </div>

                        <div className="form-group" style={{ flex: 1 }}>

                            <label>End Time</label>

                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />

                        </div>

                    </div>

                    <div className="form-actions">

                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>

                        <button type="submit">
                            {selectedSchedule ? "Update Session" : "Save Session"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddScheduleModal;