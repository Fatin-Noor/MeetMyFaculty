// Module 1 - Function 3: Home Page and Dashboard | Owner: Makib (Member 3)
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { announcementApi, facultyApi } from "../api/services";
import { Empty, Loading, formatDate } from "../components/UI";

export default function HomePage() {
  const [announcements, setAnnouncements] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([announcementApi.list(), facultyApi.list()]).then(([a, f]) => { setAnnouncements(a.data.data.slice(0, 3)); setFaculty(f.data.data.slice(0, 3)); }).catch(() => {}).finally(() => setLoading(false));
  }, []);
  return <>
    <section className="hero"><div><p className="eyebrow">Daffodil International University</p><h1>Academic support, made easier.</h1><p>Find counseling hours, academic resources, routines, announcements, and helpful conversations in one secure place.</p><div className="button-row"><Link className="button" to="/register">Create account</Link><Link className="button outline" to="/login">Log in</Link></div></div><div className="hero-card"><strong>One place for every academic connection.</strong><ul><li>Book faculty counseling</li><li>Access approved resources</li><li>Ask questions in the forum</li></ul></div></section>
    {loading ? <Loading /> : <div className="two-column"><section className="card"><div className="section-title"><h2>Latest announcements</h2><Link to="/announcements">View all</Link></div>{announcements.length ? announcements.map((item) => <article className="list-item" key={item._id}><p className="item-meta">{item.category} · {formatDate(item.createdAt)}</p><h3>{item.title}</h3><p>{item.description}</p></article>) : <Empty />}</section><section className="card"><div className="section-title"><h2>Featured faculty</h2><Link to="/faculty">Directory</Link></div>{faculty.length ? faculty.map((person) => <article className="faculty-mini" key={person._id}><div className="avatar">{person.name?.[0]}</div><div><h3>{person.name}</h3><p>{person.designation} · {person.department}</p></div></article>) : <Empty />}</section></div>}
  </>;
}

