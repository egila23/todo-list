
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();


const register = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    
    if (!fullname || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Remove manual hashing - let the schema's pre-save handle it
    const user = await User.create({
        fullname,
        email,
        password, // Schema will hash this automatically
    });

    res.status(201).json({
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
    });
});


export default register;






// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../model/user.js";
// import dotenv from "dotenv";
// dotenv.config();

// const register = asyncHandler(async (req, res) => {
//     const { fullname, email, password } = req.body;
    
//     // Validate input
//     if (!fullname || !email || !password) {  // Fixed logical error (!fullname||email||password)
//         res.status(400);
//         throw new Error("All fields are mandatory");
//     }

//     // Check if user already exists
//     const userAvailable = await User.findOne({ email });
//     if (userAvailable) {
//         res.status(400);
//         throw new Error("User already registered. Please sign in");
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10); // Reduced salt rounds to 10 (recommended)
    
//     // Create user
//     const user = await User.create({
//         fullname,
//         email,
//         password: hashedPassword,
//     });

//     // Generate JWT token for immediate login
//     // const accessToken = jwt.sign(
//     //     {
//     //         user: {
//     //             id: user._id,
//     //             email: user.email,
//     //         },
//     //     },
//     //     process.env.ACCESS_TOKEN_SECRET,
//     //     { expiresIn: "15m" }
//     // );

//     // Return response with token (excluding password)
//     res.status(201).json({
//         _id: user._id,
//         email: user.email,
//         fullname: user.fullname,
//     });
// });

// export default register;