const { 
    createTask,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    getTaskSummary
 } = require("../Model/taskModel");

const addTask = async (req, res) => {

    try{

        const {
            title,
            description,
            category,
            priority,
            status,
            due_date
        } = req.body;

        const user_id = req.user.id;
        
        


        if(!title){
            return res.status(400).json({
                message:"Task title is required."
            });
        }

        const task = await createTask(
            title,
            description,
            category,
            priority,
            status,
            due_date,
            user_id
        );

        res.status(201).json({
            message:"Task created successfully.",
            task
        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

};

const fetchTasks = async (req, res) => {
    try {

        const tasks = await getAllTasks(req.user.id);

        res.status(200).json(tasks);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};
const updateTask = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            category,
            priority,
            status,
            due_date
        } = req.body;

        const updatedTask = await updateTaskById(
            id,
            title,
            description,
            category,
            priority,
            status,
            due_date,
            req.user.id
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.status(200).json(updatedTask);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};
const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedTask = await deleteTaskById(
            id,
            req.user.id
        );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.status(200).json({
            message: "Task deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
const fetchTaskSummary = async (req, res) => {

    try {

        const summary = await getTaskSummary(req.user.id);

        res.status(200).json(summary);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports={
    addTask,
    fetchTasks,
    updateTask,
    deleteTask,
    fetchTaskSummary
};