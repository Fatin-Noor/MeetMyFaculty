import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { Notice } from "../components/UI";

const initial = { name: "", email: "", password: "", confirmPassword: "", role: "student", department: "Software Engineering", phone: "", studentId: "", designation: "" };
export default function AuthPage({ mode }) {
  const isLogin = mode === "login";
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  const { login } = useAuth(); const navigate = useNavigate();
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  async function submit(event) {
    event.preventDefault(); setError(""); setMessage("");
    if (!isLogin && form.password !== form.confirmPassword) return setError("Passwords do not match.");
    setSaving(true);
    try {
      if (isLogin) { const response = await authApi.login({ email: form.email, password: form.password }); login(response.data); navigate("/dashboard"); }
      else { const response = await authApi.signup(form); setMessage(response.data.message); setForm(initial); }
    } catch (err) { setError(err.response?.data?.message || "Something went wrong. Please try again."); } finally { setSaving(false); }
  }
  return <section className="auth-card"><p className="eyebrow">MeetMyFaculty</p><h1>{isLogin ? "Welcome back" : "Create your account"}</h1><p>{isLogin ? "Log in to continue to your academic workspace." : "Register with your institutional details. An admin must approve your account before you can log in."}</p><Notice message={message} /><Notice message={error} type="error" /><form className="form-grid" onSubmit={submit}>{!isLogin && <><label>Full name<input name="name" value={form.name} onChange={change} required /></label><label>Role<select name="role" value={form.role} onChange={change}><option value="student">Student</option><option value="faculty">Faculty</option></select></label></>}<label className={!isLogin ? "" : "full"}>Institutional email<input type="email" name="email" value={form.email} onChange={change} required placeholder="name@diu.edu.bd" /></label>{!isLogin && <><label>Department<input name="department" value={form.department} onChange={change} required /></label><label>Phone number<input name="phone" value={form.phone} onChange={change} /></label>{form.role === "student" ? <label>Student ID<input name="studentId" value={form.studentId} onChange={change} required /></label> : <label>Designation<input name="designation" value={form.designation} onChange={change} required placeholder="Lecturer" /></label>}</>}<label>Password<input type="password" name="password" value={form.password} onChange={change} minLength="6" required /></label>{!isLogin && <label>Confirm password<input type="password" name="confirmPassword" value={form.confirmPassword} onChange={change} minLength="6" required /></label>}<button className="button full" disabled={saving}>{saving ? "Please wait..." : isLogin ? "Log in" : "Register"}</button></form><p className="auth-switch">{isLogin ? <>New here? <Link to="/register">Create an account</Link></> : <>Already approved? <Link to="/login">Log in</Link></>}</p></section>;
}

