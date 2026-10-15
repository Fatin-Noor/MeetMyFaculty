// Module 1 - Function 2: Secure Login, Role-Based Access, and Profile Management | Owner: Redoan Hasan Rafin (Member 2)
import React, { useState } from "react";
import { userApi } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { Notice } from "../components/UI";

const commonFields = [["name", "Full name"], ["phone", "Phone number"], ["department", "Department"], ["profilePicture", "Profile picture URL"]];
const facultyFields = [["designation", "Designation"], ["faculty", "Faculty"], ["personalWebpage", "Personal webpage"], ["academicQualifications", "Academic qualifications"], ["trainingExperience", "Training experience"], ["teachingExperience", "Teaching experience"], ["researchInterests", "Research interests"], ["publications", "Publications"], ["awardsAndScholarships", "Awards and scholarships"], ["previousEmployment", "Previous employment"]];
export default function ProfilePage() {
  const { user, updateUser } = useAuth(); const [form, setForm] = useState(user); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  const fields = user.role === "faculty" ? [...commonFields, ...facultyFields] : [...commonFields, ["studentId", "Student ID"]];
  async function submit(event) { event.preventDefault(); setError(""); try { const response = await userApi.updateMe(form); updateUser(response.data.data); setMessage("Profile updated successfully."); } catch (err) { setError(err.response?.data?.message || "Could not update profile."); } }
  return <section className="content-narrow"><div className="page-heading"><div><p className="eyebrow">My account</p><h1>Profile</h1><p>{user.email} · {user.role}</p></div></div><Notice message={message}/><Notice message={error} type="error"/><form className="card form-grid" onSubmit={submit}>{fields.map(([key, label]) => <label key={key}>{label}<input name={key} value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></label>)}<button className="button full">Save profile</button></form></section>;
}
