import express from 'express';
import protectedRoutes, { allowedTo } from '../../middlewares/authentication';
import * as Rv  from './controller/review.controller';

const reviewRouter = express.Router();
reviewRouter
.post("/",protectedRoutes,Rv.createReview)

.get("/Recent", protectedRoutes, Rv.getRecentReviews)

.get("/:movieId/Movie", protectedRoutes, Rv.getReviewsByMovie)

.get("/:userId/user",protectedRoutes, Rv.getReviewsByUser)

.delete("/:id", protectedRoutes,allowedTo("admin"),Rv.deleteReview);

export default reviewRouter;
