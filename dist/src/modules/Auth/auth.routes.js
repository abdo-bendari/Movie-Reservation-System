"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkEmail_1 = require("./../../middlewares/checkEmail");
const auth_controller_1 = require("./controller/auth.controller");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.
    post("/signUp", checkEmail_1.checkEmail, auth_controller_1.signUp)
    .post("/signIn", auth_controller_1.signIn)
    .patch('/', auth_controller_1.changeUserPassword);
exports.default = authRouter;
