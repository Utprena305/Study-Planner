const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require("../Model/userModel");

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

module.exports = {
    registerUser
};


