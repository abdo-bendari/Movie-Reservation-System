"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: [true, "name is unique"],
        min: [2, "min length is 2 character"],
        max: [50, "max length is 50 character"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email is unique"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        enum: ["user", "admin",],
        default: "user",
    },
    phone: {
        type: [String],
        default: [],
    },
    address: {
        type: [String],
        default: []
    },
    profilePic: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.pre("save", function () {
    this.password = bcrypt_1.default.hashSync(this.password, 8);
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
