import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import UserManagementPage from "./pages/UserManagementPage";
import RoutinePage from "./pages/RoutinePage";
import CounselingPage from "./pages/CounselingPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ForumPage from "./pages/ForumPage";
import ResourcesPage from "./pages/ResourcesPage";
import FacultyPage from "./pages/FacultyPage";

function DashboardRedirect() {
  const { user } = useAuth();
  return user ? <DashboardPage /> : <Navigate to="/login" replace />;
}
function Private({ children, roles }) { return <ProtectedRoute roles={roles}><Layout>{children}</Layout></ProtectedRoute>; }
function Public({ children }) { return <Layout>{children}</Layout>; }

export default function App() {
  return <AuthProvider><BrowserRouter><Routes>
    <Route path="/" element={<Public><HomePage /></Public>} />
    <Route path="/login" element={<Public><AuthPage mode="login" /></Public>} />
    <Route path="/register" element={<Public><AuthPage mode="register" /></Public>} />
    <Route path="/dashboard" element={<Private><DashboardRedirect /></Private>} />
    <Route path="/profile" element={<Private><ProfilePage /></Private>} />
    <Route path="/admin/users" element={<Private roles={["admin"]}><UserManagementPage /></Private>} />
    <Route path="/routine" element={<Private><RoutinePage /></Private>} />
    <Route path="/counseling" element={<Private roles={["student", "faculty"]}><CounselingPage /></Private>} />
    <Route path="/announcements" element={<Private><AnnouncementsPage /></Private>} />
    <Route path="/forum" element={<Private><ForumPage /></Private>} />
    <Route path="/resources" element={<Private roles={["student", "faculty"]}><ResourcesPage /></Private>} />
    <Route path="/faculty" element={<Public><FacultyPage /></Public>} />
    <Route path="*" element={<Public><section className="center-message"><h1>Page not found</h1></section></Public>} />
  </Routes></BrowserRouter></AuthProvider>;
}

