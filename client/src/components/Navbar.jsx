import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user ? [
    ["Dashboard", "/dashboard"], ["Routine", "/routine"], ["Counseling", "/counseling"], ["Announcements", "/announcements"], ["Forum", "/forum"], ["Resources", "/resources"], ["Faculty", "/faculty"],
  ] : [["Faculty", "/faculty"]];
  if (user?.role === "admin") links.splice(1, 0, ["Users", "/admin/users"]);
  return <header className="navbar"><Link className="brand" to="/"><span>Meet</span>MyFaculty</Link><nav>{links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav><div className="nav-actions">{user ? <><Link className="profile-link" to="/profile">{user.name}</Link><button className="text-button" onClick={() => { logout(); navigate("/"); }}>Log out</button></> : <><Link to="/login">Log in</Link><Link className="button small" to="/register">Register</Link></>}</div></header>;
}

