// import express from "express";
// import login from "../controller/login.js";
// import register from "../controller/register.js";
// import validateToken from "../validateToken.js";

// const router = express.Router();

// // Public routes (no authentication required)
// router.post("/register", register);
// router.post("/login", login);

// // Protected routes (require valid token)
// // router.get("/profile", validateToken, getUserProfile);
// // router.put("/profile", validateToken, updateProfile);

// export default router;



// In routes/user.js
// import express from "express";
// import { login, register } from "../controller/authController.js"; // Suggested to combine in one file
// import validateToken from "../middleware/validateToken.js";

import express from "express";
import login from "../controller/login.js";
import register from "../controller/register.js";
import validateToken from "../validateToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Export as default
export default router;