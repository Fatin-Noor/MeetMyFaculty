import React from "react";
export function StatusBadge({ value }) { return <span className={`badge ${String(value || "").toLowerCase().replaceAll("_", "-")}`}>{String(value || "Unknown").replaceAll("_", " ")}</span>; }
export function Notice({ message, type = "success" }) { return message ? <p className={`notice ${type}`}>{message}</p> : null; }
export function Empty({ children = "No records found." }) { return <p className="empty">{children}</p>; }
export function Loading() { return <p className="center-message">Loading...</p>; }
export const formatDate = (value) => value ? new Date(value).toLocaleDateString() : "—";
