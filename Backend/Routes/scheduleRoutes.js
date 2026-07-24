const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addSchedule,
    fetchSchedules,
    updateSchedule,
    deleteSchedule
} = require("../Controller/scheduleController");

router.post("/add", authMiddleware, addSchedule);

router.get("/", authMiddleware, fetchSchedules);

router.put("/update/:id", authMiddleware, updateSchedule);

router.delete("/delete/:id", authMiddleware, deleteSchedule);

module.exports = router;
