const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { 
    createUser, 
    getUserByEmail, 
    updatePassword,
    updateFullname
} = require("../Model/userModel");

const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await createUser(
            fullname,
            email,
            hashedPassword
        );

        res.status(201).json({
            message: "User registered successfully.",
            user: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password."
            });
        }

      
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            "studyplannersecret",
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: "Email not found."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await updatePassword(email, hashedPassword);

        res.status(200).json({
            message: "Password updated successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const updateProfile = async (req, res) => {

    try {

        const { fullname } = req.body;

        if (!fullname) {
            return res.status(400).json({
                message: "Full name is required."
            });
        }

        const updatedUser = await updateFullname(
            req.user.id,
            fullname
        );

        res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    updateProfile
};



    


