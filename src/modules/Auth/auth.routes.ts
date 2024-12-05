import { checkEmail } from './../../middlewares/checkEmail';
import { changeUserPassword, signIn, signUp } from './controller/auth.controller';
import express from "express";

const authRouter =  express.Router();

authRouter.
post("/signUp",checkEmail,signUp )

.post("/signIn",signIn )

.patch('/' ,changeUserPassword)

export default authRouter;