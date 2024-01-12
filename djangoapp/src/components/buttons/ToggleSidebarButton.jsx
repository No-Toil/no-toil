import React               from "react"
import Hamburger           from "hamburger-react"
import { Tooltip }         from "@mui/material"
import { useContext }      from "../../contexts/contextProvider"
import { isMobile }        from "../../data/helperFunctions"

export default function ToggleSidebarButton() {
   const { activeSidebar, setActiveSidebar } = useContext()

   return <>

      {/* Collapse/Show Sidebar Hamburger Button */}
      <Tooltip title="Toggle Sidebar">

         {/* Tooltip needs a button as a child to work */}
         <button id="toggleSidebarButton" 
         className={activeSidebar ?  "activeSidebar" : ""} 
         onClick={() => {setActiveSidebar(!activeSidebar)}}>

            {/* Hamburger Icon */}
            {isMobile() ? // is mobile width?
               <Hamburger toggled={false} /> : // yes
               <Hamburger toggled={activeSidebar}/> // no
            }
         </button>
      </Tooltip>
   </>
}