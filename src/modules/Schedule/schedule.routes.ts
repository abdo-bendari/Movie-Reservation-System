import express from 'express'
import protectedRoutes, { allowedTo } from '../../middlewares/authentication';
import * as S from './controller/schedule.controller';

const scheduleRouter = express.Router()

scheduleRouter
.post("/",protectedRoutes,allowedTo("admin"),S.createSchedule)

.get("/", protectedRoutes, S.getAllSchedules)

.get("/search",protectedRoutes, S.getScheduleByMovieOrTheater)

.put("/:id",protectedRoutes,allowedTo("admin"),S.updateSchedule )

.delete("/:id", protectedRoutes,allowedTo("admin"),S.deleteSchedule);

export default scheduleRouter;

;



