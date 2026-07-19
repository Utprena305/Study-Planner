const express = require("express");
const dotenv = require("dotenv");
const pool = require("./Database/db");
const userRoutes = require("./Routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    });