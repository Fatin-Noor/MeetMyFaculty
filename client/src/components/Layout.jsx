import React from "react";
import Navbar from "./Navbar";
export default function Layout({ children }) { return <><Navbar /><main className="page-shell">{children}</main><footer>MeetMyFaculty · Student-Faculty Communication Platform</footer></>; }

