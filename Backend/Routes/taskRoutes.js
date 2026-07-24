const express = require("express");
const router = express.Router();

const {
    addTask,
    fetchTasks,
    updateTask,
    deleteTask,
    fetchTaskSummary
} = require("../Controller/taskController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addTask);
router.get("/", authMiddleware, fetchTasks);
router.get("/summary", authMiddleware, fetchTaskSummary);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);


module.exports = router;