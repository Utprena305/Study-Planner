const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { 
    registerUser, 
    loginUser,
    forgotPassword,
    updateProfile
 } = require("../Controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgot-password", forgotPassword);
router.put("/profile", authMiddleware, updateProfile);


module.exports = router;