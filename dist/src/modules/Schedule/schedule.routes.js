"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importStar(require("../../middlewares/authentication"));
const S = __importStar(require("./controller/schedule.controller"));
const scheduleRouter = express_1.default.Router();
scheduleRouter
    .post("/", authentication_1.default, (0, authentication_1.allowedTo)("admin"), S.createSchedule)
    .get("/", authentication_1.default, S.getAllSchedules)
    .get("/search", authentication_1.default, S.getScheduleByMovieOrTheater)
    .put("/:id", authentication_1.default, (0, authentication_1.allowedTo)("admin"), S.updateSchedule)
    .delete("/:id", authentication_1.default, (0, authentication_1.allowedTo)("admin"), S.deleteSchedule);
exports.default = scheduleRouter;
;
