import express from "express";
import authRoute from "./routes/authentication.routes.js";
import cookieParser from "cookie-parser";
import studentRoute from "./routes/students.routes.js";
import cors from "cors";
import teacherRoutes from './routes/teacher.routes.js';
import notificationsRoutes from "./routes/notifications.routes.js"
import libraryRoutes from "./routes/library.routes.js";
const app = express();
import adminRoutes from "./routes/admin.routes.js";

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// console.log(app.request)
app.use("/api/auth", authRoute);
app.use("/api/std", studentRoute);

app.use('/api/teacher', teacherRoutes);
app.use('/api/notificatons',notificationsRoutes)
app.use("/uploads", express.static("uploads"));
app.use('/api/library', libraryRoutes);
app.use('/api/admin',  adminRoutes);

export default app;