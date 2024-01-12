import React                     from "react"
import { NavLink }               from "react-router-dom"
import { Tooltip }               from "@mui/material"
import { documentTitleSuffix }   from "../App"
import { useContext }            from "../contexts/contextProvider"
import * as buttons              from "../components/buttons"
import { SortByDropdown }        from "../components/dropdowns"
import { CreateTodoForm }        from "../components/forms"
import { DashboardTodoTable }    from "../components/tables"

export default function Dashboard() {
   const { activeSidebar } = useContext()
   const [ selectedTask, setSelectedTask ] = React.useState(-1)
   const [ addMore, setAddMore ] = React.useState(false)

   React.useEffect(() => {
      document.title = "Dashboard"
      document.querySelector("#headerTitle").innerText = document.title
      document.querySelector("title").textContent = 
         document.title + documentTitleSuffix
   }, [])
   
   return <div id={document.title}>
      <span id="topButtons">
         <span style={{gap: "0", flexWrap: "wrap"}}>
            <SortByDropdown />
            <buttons.NextPageButton to="Stamp" />
         </span>
      </span>

      <DashboardTodoTable 
      selectedTask={selectedTask} 
      setSelectedTask={setSelectedTask} 
      />

      <span id="bottomButtons" style={{flexWrap: "wrap"}}>
         <Tooltip title="Toggle the Create Tasks Form." placement="right">
            <button className="add" onClick={() => {
               if (activeSidebar) return // disable
               setAddMore(!addMore)
            }}>
               {addMore ? "Cancel" : "Add more" }
            </button>
         </Tooltip>

         <Tooltip title="Go to the Discarded Parts page." placement="left">
            <NavLink to="/DiscardedParts"
            onClick={event => {
               if (activeSidebar) event.preventDefault()
            }}>
               <button>
                  Go to Discarded Parts →
               </button>
            </NavLink>
         </Tooltip>
      </span>

      <span id="addMoreDropdown" style={{
         visibility: addMore ? "visible" : "hidden",
      }}>
         <CreateTodoForm />
      </span>

   </div>
}