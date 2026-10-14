import React, { useEffect, useState } from "react";
import { routineApi } from "../api/services";
import { Empty, Loading } from "../components/UI";

export default function RoutinePage() {
  const [routines, setRoutines] = useState([]); const [filters, setFilters] = useState({ department: "", semester: "", section: "", batch: "" }); const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); routineApi.list(filters).then((res) => setRoutines(res.data.data)).finally(() => setLoading(false)); };
  useEffect(load, []);
  return <><section className="page-heading"><div><p className="eyebrow">Academic schedule</p><h1>Class routine</h1><p>Filter the routine for your department, semester, section, or batch.</p></div></section><div className="toolbar">{Object.keys(filters).map((key) => <input key={key} placeholder={key[0].toUpperCase() + key.slice(1)} value={filters[key]} onChange={(e) => setFilters({ ...filters, [key]: e.target.value })} />)}<button className="button small" onClick={load}>Apply filters</button></div>{loading ? <Loading/> : <section className="card table-card"><table><thead><tr><th>Course</th><th>Faculty</th><th>Class</th><th>Day</th><th>Time</th></tr></thead><tbody>{routines.length ? routines.map((item) => <tr key={item._id}><td><strong>{item.courseCode}</strong><br/><small>{item.courseTitle}</small></td><td>{item.faculty?.name}</td><td>{item.classroom}</td><td>{item.day}</td><td>{item.startTime} - {item.endTime}</td></tr>) : <tr><td colSpan="5"><Empty /></td></tr>}</tbody></table></section>}</>;
}
