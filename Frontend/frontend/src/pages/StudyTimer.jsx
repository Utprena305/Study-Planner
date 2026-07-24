import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/StudyTimer.css";

function StudyTimer() {
        const TIMER_MODES = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
    };

    const [mode, setMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(TIMER_MODES.pomodoro);
    const [isRunning, setIsRunning] = useState(false);
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const changeMode = (newMode) => {

        setMode(newMode);
        setIsRunning(false);
        setTimeLeft(TIMER_MODES[newMode]);

    };

    const seconds = String(timeLeft % 60).padStart(2, "0");
    useEffect(() => {

        let timer;

        if (isRunning && timeLeft > 0) {

            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

        }

        if (timeLeft === 0) {

            setIsRunning(false);
            alert("🎉 Study session completed!");

        }

        return () => clearInterval(timer);

    }, [isRunning, timeLeft]);
    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar showGreeting={false} />

                <div className="dashboard-body">

                <div className="page-header">
                    <h2>Study Timer</h2>
                    <p>Stay focused using the Pomodoro technique.</p>
                </div>
                <div className="mode-buttons">

                    <button
                        className={mode === "pomodoro" ? "active-mode" : ""}
                        onClick={() => changeMode("pomodoro")}
                    >
                        Pomodoro
                    </button>

                    <button
                        className={mode === "shortBreak" ? "active-mode" : ""}
                        onClick={() => changeMode("shortBreak")}
                    >
                        Short Break
                    </button>

                    <button
                        className={mode === "longBreak" ? "active-mode" : ""}
                        onClick={() => changeMode("longBreak")}
                    >
                        Long Break
                    </button>

                </div>
                <div className="timer-card">

                    <h1>{minutes}:{seconds}</h1>

                </div>
                
                <div className="timer-buttons">

                    <button
                        className="start-btn"
                        disabled={isRunning}
                        onClick={() => setIsRunning(true)}
                    >
                        Start
                    </button>

                    <button
                        className="pause-btn"
                        disabled={!isRunning}
                        onClick={() => setIsRunning(false)}
                    >
                        Pause
                    </button>

                    <button
                        onClick={() => {
                            setIsRunning(false);
                            setTimeLeft(TIMER_MODES[mode]);
                        }}
                        className="reset-btn"
                    >
                        Reset
                    </button>

                </div>
                <div className="timer-info">

                    <div className="info-card">
                        <h4>Mode</h4>
                        <p>
                            {mode === "pomodoro"
                                ? "Pomodoro"
                                : mode === "shortBreak"
                                ? "Short Break"
                                : "Long Break"}
                        </p>
                    </div>

                    <div className="info-card">
                        <h4>Status</h4>
                        <p>{isRunning ? "Running 🟢" : "Paused ⏸"}</p>
                    </div>

                </div>
                </div>

            </div>

        </div>
    );
}

export default StudyTimer;