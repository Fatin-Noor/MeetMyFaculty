// Module 1 - Function 3: Home Page and Dashboard | Owner: Makib (Member 3)
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { announcementApi, counselingApi, resourceApi, userApi } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { Empty, Loading, StatusBadge } from "../components/UI";

export default function DashboardPage() {
  const { user } = useAuth(); const [data, setData] = useState({ items: [], announcements: [], users: [] }); const [loading, setLoading] = useState(true);
  useEffect(() => {
    const requests = [announcementApi.list()];
    if (user.role === "student") requests.push(counselingApi.myRequests(), resourceApi.myAccess());
    if (user.role === "faculty") requests.push(counselingApi.facultyRequests(), resourceApi.facultyAccess());
    if (user.role === "admin") requests.push(userApi.list({ status: "pending" }), userApi.list());
    Promise.all(requests).then((responses) => setData({ announcements: responses[0].data.data, items: responses[1]?.data.data || [], users: responses[2]?.data.data || [] })).finally(() => setLoading(false));
  }, [user.role]);
  if (loading) return <Loading />;
  const title = user.role === "admin" ? "Admin dashboard" : `${user.role === "faculty" ? "Faculty" : "Student"} dashboard`;
  return <><section className="page-heading"><div><p className="eyebrow">Welcome, {user.name}</p><h1>{title}</h1><p>Here is a quick view of your academic activity.</p></div><Link className="button" to="/profile">Edit profile</Link></section><div className="stats-grid"><div className="stat"><span>{data.items.length}</span><p>{user.role === "admin" ? "Pending accounts" : user.role === "faculty" ? "Counseling requests" : "My counseling requests"}</p></div><div className="stat"><span>{data.announcements.length}</span><p>Announcements</p></div><div className="stat"><span>{user.role === "admin" ? data.users.length : "" + (user.role === "student" ? "Resources" : "Access requests")}</span><p>{user.role === "admin" ? "All users" : "Academic support"}</p></div></div><div className="two-column"><section className="card"><div className="section-title"><h2>{user.role === "admin" ? "Pending accounts" : user.role === "faculty" ? "Recent counseling requests" : "My recent requests"}</h2><Link to={user.role === "admin" ? "/admin/users" : "/counseling"}>Open</Link></div>{data.items.length ? data.items.slice(0, 4).map((item) => <div className="list-item compact" key={item._id}><strong>{item.student?.name || item.resource?.title || item.faculty?.name || item.name}</strong><p><StatusBadge value={item.status || item.accountStatus} /></p></div>) : <Empty />}</section><section className="card"><div className="section-title"><h2>Recent announcements</h2><Link to="/announcements">Open</Link></div>{data.announcements.length ? data.announcements.slice(0, 4).map((item) => <div className="list-item compact" key={item._id}><strong>{item.title}</strong><p>{item.category}</p></div>) : <Empty />}</section></div></>;
}

