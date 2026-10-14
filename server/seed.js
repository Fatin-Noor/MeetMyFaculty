require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Routine = require("./models/Routine");
const CounselingSlot = require("./models/CounselingSlot");
const CounselingRequest = require("./models/CounselingRequest");
const Announcement = require("./models/Announcement");
const ForumPost = require("./models/ForumPost");
const Resource = require("./models/Resource");
const ResourceAccessRequest = require("./models/ResourceAccessRequest");

async function seed() {
  await connectDB();
  await Promise.all([User.deleteMany(), Routine.deleteMany(), CounselingSlot.deleteMany(), CounselingRequest.deleteMany(), Announcement.deleteMany(), ForumPost.deleteMany(), Resource.deleteMany(), ResourceAccessRequest.deleteMany()]);
  const password = await bcrypt.hash("Student123!", 10);
  const facultyPassword = await bcrypt.hash("Faculty123!", 10);
  const adminPassword = await bcrypt.hash("Admin123!", 10);

  const [admin, sadia, shamim, fatin, redoan, deluwar, pendingStudent] = await User.create([
    { name: "System Admin", email: "admin@diu.edu.bd", password: adminPassword, role: "admin", accountStatus: "approved", department: "Software Engineering" },
    { name: "Sadia Sultana Dia", email: "sadia.swe@diu.edu.bd", password: facultyPassword, role: "faculty", accountStatus: "approved", department: "Software Engineering", designation: "Lecturer", faculty: "Faculty of Science and Information Technology", phone: "+880 9617 901233", researchInterests: "Software Engineering, Web Applications", teachingExperience: "Software Engineering Design Capstone Project" },
    { name: "Md. Shamsul Alam", email: "shams.swe@diu.edu.bd", password: facultyPassword, role: "faculty", accountStatus: "approved", department: "Software Engineering", designation: "Lecturer", faculty: "Faculty of Science and Information Technology", researchInterests: "Machine Learning, Data Science", teachingExperience: "Database Systems and Machine Learning" },
    { name: "Fatin Noor Hoque", email: "fatin.swe@diu.edu.bd", password, role: "student", accountStatus: "approved", department: "Software Engineering", studentId: "241-35-288", phone: "+880 1700 000000" },
    { name: "Redoan Hasan Rafin", email: "redoan.swe@diu.edu.bd", password, role: "student", accountStatus: "approved", department: "Software Engineering", studentId: "241-35-200" },
    { name: "Deluwar Hosen", email: "deluwar.swe@diu.edu.bd", password, role: "student", accountStatus: "approved", department: "Software Engineering", studentId: "241-35-225" },
    { name: "Pending Student", email: "pending.swe@diu.edu.bd", password, role: "student", accountStatus: "pending", department: "Software Engineering", studentId: "241-35-999" },
  ]);

  await Routine.create([
    { department: "Software Engineering", semester: "Fall 2026", section: "D2", batch: "36", courseCode: "SE331", courseTitle: "Software Engineering Design Capstone Project", faculty: sadia._id, classroom: "AB-402", day: "Sunday", startTime: "10:00", endTime: "11:30" },
    { department: "Software Engineering", semester: "Fall 2026", section: "D2", batch: "36", courseCode: "SE321", courseTitle: "Database Management Systems", faculty: shamim._id, classroom: "AB-301", day: "Tuesday", startTime: "11:30", endTime: "13:00" },
  ]);

  const [slotOne, slotTwo] = await CounselingSlot.create([
    { faculty: sadia._id, date: new Date("2026-10-20"), startTime: "14:00", endTime: "14:20" },
    { faculty: shamim._id, date: new Date("2026-10-22"), startTime: "12:00", endTime: "12:20", isBooked: true },
  ]);
  await CounselingRequest.create({ student: redoan._id, faculty: shamim._id, slot: slotTwo._id, reason: "I need help planning my database project.", status: "pending" });

  await Announcement.create([
    { title: "Welcome to MeetMyFaculty", description: "Use this platform to find routines, request counseling, and access your course resources.", category: "General", author: admin._id },
    { title: "SE331 Project Proposal Submission", description: "Please submit your proposal document before the announced deadline.", category: "Academic", author: sadia._id },
  ]);
  await ForumPost.create({ title: "How should we divide our capstone modules?", description: "Our group wants a simple way to divide the project work fairly.", category: "Project Help", author: fatin._id, comments: [{ user: sadia._id, content: "Divide the features into modules and assign four functions to each member." }] });

  const [slides, groupLink] = await Resource.create([
    { title: "SE331 Proposal Guidelines", description: "Slides for the capstone project proposal.", courseName: "Software Engineering Design Capstone Project", courseCode: "SE331", semester: "Fall 2026", section: "D2", resourceType: "slides", resourceUrl: "https://drive.google.com/", faculty: sadia._id, isRestricted: true },
    { title: "SE321 Course Group", description: "Official course discussion group.", courseName: "Database Management Systems", courseCode: "SE321", semester: "Fall 2026", section: "D2", resourceType: "whatsapp", resourceUrl: "https://chat.whatsapp.com/", faculty: shamim._id, isRestricted: false },
  ]);
  await ResourceAccessRequest.create({ student: fatin._id, resource: slides._id, studentId: fatin.studentId, department: fatin.department, semester: "Fall 2026", section: "D2", status: "pending" });
  console.log("Seed data created.");
  console.log("Admin: admin@diu.edu.bd / Admin123!");
  console.log("Faculty: sadia.swe@diu.edu.bd / Faculty123!");
  console.log("Student: fatin.swe@diu.edu.bd / Student123!");
}

seed().catch((error) => { console.error(error); process.exit(1); });
