import React            from "react"
import { NavLink }      from "react-router-dom"
import { isMobile }     from "../../data/helperFunctions"
import { useContext }   from "../../contexts/contextProvider"

export default function BackToDashboardButton() {
   const { activeSidebar } = useContext()
   return <div className="BackToDashboardButton">
      <NavLink to="/" onClick={event => {
         if (activeSidebar) event.preventDefault()
      }}>
         <button>
            ← Back to Dashboard
         </button>
      </NavLink>
   </div>
}
