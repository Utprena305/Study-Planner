const {
    createSchedule,
    getAllSchedules,
    updateScheduleById,
    deleteScheduleById
} = require("../Model/scheduleModel");


const addSchedule = async (req, res) => {

    try {

        const { subject, session_date, start_time, end_time } = req.body;

        const schedule = await createSchedule(
            req.user.id,
            subject,
            session_date,
            start_time,
            end_time
        );

        res.status(201).json(schedule);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }

};

const fetchSchedules = async (req, res) => {

    try {

        const schedules = await getAllSchedules(req.user.id);

        res.status(200).json(schedules);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }

};

const updateSchedule = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            subject,
            session_date,
            start_time,
            end_time
        } = req.body;

        const updatedSchedule = await updateScheduleById(
            id,
            req.user.id,
            subject,
            session_date,
            start_time,
            end_time
        );

        if (!updatedSchedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        res.status(200).json(updatedSchedule);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};
const deleteSchedule = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedSchedule = await deleteScheduleById(
            id,
            req.user.id
        );

        if (!deletedSchedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        res.status(200).json({
            message: "Schedule deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    addSchedule,
    fetchSchedules,
    updateSchedule,
    deleteSchedule
};