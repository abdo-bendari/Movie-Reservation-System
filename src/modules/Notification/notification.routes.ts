import express from 'express';
import protectedRoutes, { allowedTo } from '../../middlewares/authentication';
import * as N from './controller/notification.controller';

const notificationRouter = express.Router();
notificationRouter.use(protectedRoutes,allowedTo('admin'))
notificationRouter
.post('/',N.createNotification)

.patch('/:id',N.markNotificationAsRead)

.delete('/:id',N.deleteAllNotificationsForUser)


export default notificationRouter;