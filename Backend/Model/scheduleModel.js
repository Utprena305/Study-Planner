const pool = require("../Database/db");

const createSchedule = async (user_id, subject, session_date, start_time, end_time) => {

    const query = `
        INSERT INTO schedules
        (user_id, subject, session_date, start_time, end_time)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [user_id, subject, session_date, start_time, end_time];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const getAllSchedules = async (user_id) => {

    const query = `
        SELECT *
        FROM schedules
        WHERE user_id = $1
        ORDER BY session_date ASC, start_time ASC;
    `;

    const result = await pool.query(query, [user_id]);

    return result.rows;
};

const updateScheduleById = async (
    id,
    user_id,
    subject,
    session_date,
    start_time,
    end_time
) => {

    const query = `
        UPDATE schedules
        SET
            subject = $1,
            session_date = $2,
            start_time = $3,
            end_time = $4
        WHERE id = $5
        AND user_id = $6
        RETURNING *;
    `;

    const values = [
        subject,
        session_date,
        start_time,
        end_time,
        id,
        user_id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

};

const deleteScheduleById = async (id, user_id) => {

    const query = `
        DELETE FROM schedules
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
    `;

    const result = await pool.query(query, [id, user_id]);

    return result.rows[0];

};

module.exports = {
    createSchedule,
    getAllSchedules,
    updateScheduleById,
    deleteScheduleById
};