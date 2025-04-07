
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/user.js";

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error("Both email and password are required");
    }

    // Make sure to select password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    // Use the schema method to compare passwords
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    // Match token structure with what validateToken expects
    const token = jwt.sign(
        { 
            user: {  // Keep this structure consistent
                id: user._id,
                email: user.email 
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '30m' }
    );

    res.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email,
            name: user.fullname
        }
    });
});

export default login;











// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../model/user.js";

// const login = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
    
//     console.log("Login attempt for:", email); // Debug log
    
//     if (!email || !password) {
//         console.log("Missing credentials"); // Debug
//         res.status(400);
//         throw new Error("Both email and password are required");
//     }

//     const user = await User.findOne({ email }).select('+password');
    
//     if (!user) {
//         console.log("User not found:", email); // Debug
//         res.status(401);
//         throw new Error("Invalid credentials");
//     }

//     console.log("Stored hash:", user.password); // Debug
//     console.log("Input password:", password); // Debug

//     const isMatch = await bcrypt.compare(password, user.password);
    
//     if (!isMatch) {
//         console.log("Password mismatch for user:", email); // Debug
//         res.status(401);
//         throw new Error("Invalid credentials");
//     }

//     const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '30m'
//     });

//     res.status(200).json({
//         token,
//         user: {
//             id: user._id,
//             email: user.email,
//             name: user.fullname
//         }
//     });
// });

// export default login;
