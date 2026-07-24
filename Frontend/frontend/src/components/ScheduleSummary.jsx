function ScheduleSummary({ schedules, totalStudyHours }) {

    return (

        <div
            style={{
                display: "flex",
                gap: "20px",
                marginBottom: "25px"
            }}
        >

            <div className="stat-card">

                <h4>Total Sessions</h4>

                <h2>{schedules.length}</h2>

            </div>

            <div className="stat-card">

                <h4>Total Study Hours</h4>

                <h2>{totalStudyHours} hrs</h2>

            </div>

        </div>

    );

}

export default ScheduleSummary;