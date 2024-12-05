import Notification from "../../../../database/models/Notification";
import sendEmail from "../../../utils/sendEmail";
import catchError from "../../../middlewares/catchError";
import { AppError } from "../../../utils/Error";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";


export const createNotification = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { user, title, message, type, email } = req.body;
  
    if (!user || !title || !message || !type) {
      return next(new AppError("Please provide all required fields", 400));
    }
  
    const notification = new Notification({
      user,
      title,
      message,
      type,
      email,
    });
  
    await notification.save();
  
    // Send email notification if type is 'email'
    if (type === "email" && email) {
      try {
        await sendEmail({
          to: email,
          subject: title,
          text: message,
        });
        console.log("Email sent successfully");
      } catch (error) {
        return next(new AppError("Failed to send email notification", 500));
      }
    }
  
    return res.status(201).json({ message: "Notification created successfully", notification });
  });

  export const markNotificationAsRead = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
  
    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }
  
    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  });
  

  export const deleteAllNotificationsForUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    const notifications = await Notification.deleteMany({ user: id });
  
    return res.status(200).json({
      message: `All notifications deleted successfully for user ${id}`,
      deletedCount: notifications.deletedCount,
    });
  });
  