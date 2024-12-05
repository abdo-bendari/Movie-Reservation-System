"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name should have a minimum length of 2 characters",
        "string.max": "Name should have a maximum length of 50 characters",
    }),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .length(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        .required(),
    role: joi_1.default.string()
        .valid("user", "admin")
        .default("user"),
    phone: joi_1.default.array()
        .items(joi_1.default.string().pattern(/^[0-9]+$/)).default([]),
    address: joi_1.default.array().items(joi_1.default.string()).default([]),
    profilePic: joi_1.default.string().uri().default("https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg")
});
exports.default = addUserSchema;
