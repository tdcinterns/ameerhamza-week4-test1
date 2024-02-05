import express from "express";
import { userLogin, userSignup } from "../controllers/usersController.js";
// validation middleware
import {loginValidation,signupValidation} from "../middlewares/inputValidation.js"
const router= express.Router();

router.post('/signup',signupValidation,userSignup);

router.post('/login',loginValidation,userLogin);

export default router;