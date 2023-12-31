import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { SidebarContext } from "ehrrsn7-components"
import { Sidebar } from "@components"
import { useKeyDown, useOnClick } from "./hooks"
import Pages from "@pages"
import "./App.css"

export function App() {
   const { sidebarMarginLeft } = React.useContext(SidebarContext)
   const { showSidebar, setShowSidebar } = React.useContext(SidebarContext)
   useKeyDown(() => setShowSidebar(!showSidebar), ["KeyB"], { modifiers: ["metaKey"] }); // toggle sidebar on ctrl-B
   useKeyDown(() => setShowSidebar(false), ["Escape"]); // close sidebar on esc/non-sidebar click
   useOnClick(() => {setShowSidebar(false)}, { element: document.querySelector(".Page") });

   return <div id="App"
   style={{ marginLeft: sidebarMarginLeft }}>
      <Routes>
			<Route path="/" element={<Pages.Dashboard />} />
			<Route path="/Dashboard" element={<Navigate to="/" />} />
			<Route path="/Stamp" element={<Pages.Stamp />} />
			<Route path="/Spray" element={<Pages.Spray />} />
			<Route path="/Check" element={<Pages.Check />} />
			<Route path="/Oil" element={<Pages.Oil />} />
			<Route path="/Bag" element={<Pages.Bag />} />
			<Route path="/HighPriority" element={<Pages.HighPriority />} />
			<Route path="/CompletedParts" element={
            <Pages.CompletedParts />
         } />
			<Route path="/DiscardedParts" element={
            <Pages.DiscardedParts />
         } />
		</Routes>

      {/* Absolute Content */}
      <Sidebar />
      <ToastContainer />
   </div>
}

export default App
