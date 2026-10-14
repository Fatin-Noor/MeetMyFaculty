const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const routineRoutes = require("./routes/routineRoutes");
const counselingRoutes = require("./routes/counselingRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const forumRoutes = require("./routes/forumRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const accessRoutes = require("./routes/resourceAccessRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(logger);

app.get("/api/health", (req, res) => res.json({ success: true, message: "MeetMyFaculty API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/counseling", counselingRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/resource-access-requests", accessRoutes);
app.use("/api/faculty", facultyRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;

