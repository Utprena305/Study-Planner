const pool = require("../Database/db");

const createTask = async (
    title,
    description,
    category,
    priority,
    status,
    due_date,
    user_id
) => {

    const query = `
        INSERT INTO tasks
        (title, description, category, priority, status, due_date, user_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
    `;

    const values = [
        title,
        description,
        category,
        priority,
        status,
        due_date,
        user_id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};
const getAllTasks = async (user_id) => {

    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
        [user_id]
    );

    return result.rows;
};
const updateTaskById = async (
    id,
    title,
    description,
    category,
    priority,
    status,
    due_date,
    user_id
) => {

    const query = `
        UPDATE tasks
        SET
            title = $1,
            description = $2,
            category = $3,
            priority = $4,
            status = $5,
            due_date = $6
        WHERE id = $7
        AND user_id = $8
        RETURNING *;
    `;

    const values = [
        title,
        description,
        category,
        priority,
        status,
        due_date,
        id,
        user_id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const deleteTaskById = async (id, user_id) => {

    const result = await pool.query(
        `DELETE FROM tasks
         WHERE id = $1
         AND user_id = $2
         RETURNING *`,
        [id, user_id]
    );

    return result.rows[0];
};

const getTaskSummary = async (user_id) => {

    const query = `
        SELECT
            COUNT(*) AS total,

            COUNT(*) FILTER (WHERE status = 'Completed') AS completed,

            COUNT(*) FILTER (WHERE status = 'In Progress') AS in_progress,

            COUNT(*) FILTER (WHERE status = 'To Do') AS todo

        FROM tasks

        WHERE user_id = $1;
    `;

    const result = await pool.query(query, [user_id]);

    return result.rows[0];
};

module.exports = {
    createTask,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    getTaskSummary
};