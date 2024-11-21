import express from "express"
import { signupValidation } from "../middlewares/validations.js"
import * as authController from "../controllers/auth.js"
//import { signUp, login } from "../controllers/auth.js"

const router = express.Router()

router.post('/signUp', signupValidation ,authController.signUp)
router.post('/login', authController.login)



export default router