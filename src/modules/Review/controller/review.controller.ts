import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Review from "../../../../database/models/Review";
import { Request, Response, NextFunction } from "express";


export const createReview = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { movie, user, rating, comment } = req.body;

  if (!movie || !user || !rating) {
    return next(new AppError("Movie, user, and rating are required", 400));
  }

  const existingReview = await Review.findOne({ movie, user });
  if (existingReview) {
    return next(new AppError("You have already reviewed this movie", 400));
  }

  const review = new Review({
    movie,
    user,
    rating,
    comment,
  });

  await review.save();
  res.status(201).json({ message: "Review created successfully", review });
});

export const getReviewsByMovie = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { movieId } = req.params;
  
    if (!movieId) {
      return next(new AppError("Movie ID is required", 400));
    }
  
    const reviews = await Review.find({ movie: movieId }).populate("user", "name email");
    if (reviews.length === 0) {
      return next(new AppError("No reviews found for this movie", 404));
    }
  
    res.status(200).json({ message: "Success", totalCount: reviews.length, reviews });
  });

  export const getReviewsByUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
  
    if (!userId) {
      return next(new AppError("User ID is required", 400));
    }
  
    const reviews = await Review.find({ user: userId }).populate("movie", "title");
    if (reviews.length === 0) {
      return next(new AppError("No reviews found for this user", 404));
    }
  
    res.status(200).json({ message: "Success", totalCount: reviews.length, reviews });
  });

  export const deleteReview = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    if (!id) {
      return next(new AppError("Review ID is required", 400));
    }
  
    const review = await Review.findByIdAndDelete(id);
  
    if (!review) {
      return next(new AppError("Review not found", 404));
    }
  
    res.status(200).json({ message: "Review deleted successfully" });
  });

  
  export const getRecentReviews = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 5;
  
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("movie", "title")
      .populate("user", "name");
  
    if (reviews.length === 0) {
      return next(new AppError("No recent reviews found", 404));
    }
  
    res.status(200).json({ message: "Success", reviews });
  });
  