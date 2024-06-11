const express = require("express")
const { UserLogin,
    UserRegister,
    addWorkout,
    getUserDashboard,
    getWorkoutsByDate} = require('../controllers/User')
const {verifyToken} = require('../middleware/verifyToken')

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);

module.exports = router