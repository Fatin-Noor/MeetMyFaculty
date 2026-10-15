// Module 1 - Function 2: Secure Login and Role-Based Access
// Owner: Redoan Hasan Rafin (Member 2)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { Notice } from "../components/UI";

export default function LoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  const { login } = useAuth(); const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault(); setError(""); setSaving(true);
    try { const response = await authApi.login({ email, password }); login(response.data); navigate("/dashboard"); } catch (err) { setError(err.response?.data?.message || "Login failed. Please try again."); } finally { setSaving(false); }
  }
  return <section className="auth-card"><p className="eyebrow">MeetMyFaculty</p><h1>Welcome back</h1><p>Log in to continue to your academic workspace.</p><Notice message={error} type="error"/><form className="form-grid" onSubmit={submit}><label className="full">Institutional email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="name@diu.edu.bd"/></label><label className="full">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength="6" required/></label><button className="button full" disabled={saving}>{saving ? "Please wait..." : "Log in"}</button></form><p className="auth-switch">New here? <Link to="/register">Create an account</Link></p></section>;
}
