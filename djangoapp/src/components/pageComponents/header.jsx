import React                     from "react"
import { Tooltip }               from "@mui/material"
import { ToggleSidebarButton }   from "../buttons"
import * as h                    from "../../data/helperFunctions"
import { useContext }            from "../../contexts/contextProvider"

export default function Header() {
   const { activeSidebar, wsConnected } = useContext()
   const [ date, setDate ] = React.useState(undefined)

   React.useEffect(() => {
      // update date once a second
      setInterval(() => {setDate(h.getCurrentDate())}, 1)
   }, [])

   return <header id="Header" className="App-header">

      <span style={{padding: ".5em"}}>
         <span style={{width: "fit-content", gap: "1em"}}>

            {/* Hamburger Toggle Sidebar Button */}
            <ToggleSidebarButton />

            {/* Page Title */}
            <h1 id="headerTitle" className={
               activeSidebar ? "activeSidebar" : ""
            }>
               No Toil Task Tracker
            </h1>
         </span>

         <h1 className="hideOnMobile" style={{textAlign: "right"}}>

            {/* Date */}
            {date && date.toDateString()}<br></br>
            {date && date.toLocaleTimeString()}<br></br>
            
            {/* Connected/Disconnected Status Indicator */}
            {  wsConnected ? 

               /* Connected */
               <p className="hideOnPrint" style={{
                  color: h.isDarkMode(window) ? "lightgreen" : "green"
               }}>
                  Connected 
               </p> 
               
               : // else
               
               /* Disconnected (with reload action) */
               <Tooltip title="Please reload the page." placement="top">
                  <p className="hideOnPrint" 
                  onClick={() => {
                     if (activeSidebar) return
                     window.location.reload()
                  }}
                  style={{color: h.isDarkMode(window) ? "lightred" : "red"}}>
                     Disconnected
                  </p>
               </Tooltip>
            } {/* End Connected/Disconnected Status Indicator */}
         </h1> {/* End Hide on Mobile */}
      </span> {/* End Inner span tag within header tag */}
   </header> /* End Header Div */
}