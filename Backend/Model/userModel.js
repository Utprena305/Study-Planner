const pool = require("../Database/db");

const createUser = async (fullname, email, password) => {
    const query = `
        INSERT INTO users(fullname, email, password)
        VALUES($1, $2, $3)
        RETURNING *;
    `;

    const values = [fullname, email, password];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const query = `
        SELECT * FROM users
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};
const updatePassword = async (email, password) => {
    const query = `
        UPDATE users
        SET password = $1
        WHERE email = $2
        RETURNING *;
    `;

    const values = [password, email];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const updateFullname = async (id, fullname) => {

    const query = `
        UPDATE users
        SET fullname = $1
        WHERE id = $2
        RETURNING id, fullname, email;
    `;

    const values = [fullname, id];

    const result = await pool.query(query, values);

    return result.rows[0];

};
module.exports = {
    createUser,
    getUserByEmail,
    updatePassword,
    updateFullname
};