import { AppError } from "../../../utils/Error";
import catchError from "../../../middlewares/catchError";
import Genre from "../../../../database/models/Genre";
import { Request, Response, NextFunction } from "express";

export const addGenre = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description ,movies} = req.body;
    if (!name) {
      return next(new AppError("Please provide the name of the genre", 400));
    }
    const genre = new Genre({
      name,
      description,
      movies
    });
    await genre.save();
    res.status(201).json({
      message: "Genre created successfully",
      genre,
    });
  }
);
export const getAllGenres = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const genres = await Genre.find();
    if (genres.length === 0) {
      return next(new AppError("No genres found", 404));
    }
    res.status(200).json({
      message: "Genres retrieved successfully",
      totalCount: genres.length,
      genres,
    });
  }
);

export const getGenreById = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide the ID of the genre", 400));
    }

    const genre = await Genre.findById(id).populate("movies");

    if (!genre) {
      return next(new AppError("Genre not found", 404));
    }

    res.status(200).json({
      message: "Genre retrieved successfully",
      genre,
    });
  }
);

export const updateGenre = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) {
      return next(new AppError("Please provide the ID of the genre", 400));
    }

    const genre = await Genre.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!genre) {
      return next(new AppError("Genre not found", 404));
    }

    res.status(200).json({
      message: "Genre updated successfully",
      genre,
    });
  }
);

export const deleteGenre = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide the ID of the genre", 400));
    }

    const genre = await Genre.findByIdAndDelete(id);

    if (!genre) {
      return next(new AppError("Genre not found", 404));
    }

    res.status(200).json({
      message: "Genre deleted successfully",
    });
  }
);

export const getMoviesByGenre = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide the ID of the genre", 400));
    }

    const genre = await Genre.findById(id).populate("movies");

    if (!genre) {
      return next(new AppError("Genre not found", 404));
    }

    res.status(200).json({
      message: "Movies retrieved successfully",
      movies: genre.movies,
    });
  }
);

export const addMovieToGenre = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { movieId } = req.body;

    if (!id || !movieId) {
      return next(
        new AppError("Please provide the genre ID and movie ID", 400)
      );
    }

    const genre = await Genre.findById(id);

    if (!genre) {
      return next(new AppError("Genre not found", 404));
    }

    if (!genre.movies.includes(movieId)) {
      genre.movies.push(movieId as any);
      await genre.save();
    }

    res.status(200).json({
      message: "Movie added to genre successfully",
      genre,
    });
  }
);
