import React                  from "react"
import { NavLink }            from "react-router-dom"
import { Tooltip }            from "@mui/material"
import * as Buttons           from "../buttons"
import { TodoAccordionDiv }   from "../accordionDivs"
import { useContext }         from "../../contexts/contextProvider"
import * as h                 from "../../data/helperFunctions"

export default function DashboardTableRow({ 
   rowData, selectedTask, setSelectedTask 
}) {
   const { activeSidebar } = useContext()

   const status = () =>  h.capitalize(h.statusNames.get(rowData.status))
   const sets = () => rowData.status <= 1
   const lastModified = () => 
      new Date(rowData.lastModified).toLocaleDateString()
   
   return <>

      {/* Dashboard Table Row */}
      <tr id={"DashboardRow" + rowData.id} key={rowData.id}
      onClick={event => {
         event.preventDefault()
         if (!h.isMobile() || activeSidebar) return 
         setSelectedTask(
            selectedTask === rowData.id ? -1 : rowData.id
         )
      }}>

         <td>
            <p>
               {rowData.title}
            </p>
         </td>

         <td> {sets() ?
            <Tooltip title="Note: 1 Set = 18 Each" placement="left">
               <p>
                  {parseInt(rowData.quantity / 18) + " Set"}
                  {parseInt(rowData.quantity) !== 18 && 's'}
               </p>
            </Tooltip> 
            : 
            <p>
               {parseInt(rowData.quantity) + " Each"}
            </p>
         } </td>

         { !h.isMobile() &&
            <td align="center">
               <span>
                  {lastModified()}
               </span>
            </td>
         }

         <td align="center">
            <NavLink to={'/' + status()}
            onClick={event => {
               if (activeSidebar) event.preventDefault()
            }}>
               <button>
                  {status()}
               </button>
            </NavLink>
         </td>

         <td>
            <p>
               {rowData.highPriority ? "!" : " "}
            </p>
         </td>
         
         {!h.isMobile() &&
            <td align="center" className="AccordionButtonColumn" style={{
               width: "10px",
            }}>
               <Buttons.AccordionButton 
               selected={selectedTask === rowData.id} 
               onClick={() => {
                  if (activeSidebar) return // disable
                  setSelectedTask(
                     selectedTask === rowData.id ? -1 : rowData.id
                  )
               }} />
            </td>
         }
      </tr>

      {/* Dropdown Row (Hidden Todo Accordion Div) */}
      <tr className={
         selectedTask === rowData.id ? 
         "AccordionRow Expanded" : 
         "AccordionRow"}
      >
         <td colSpan={"100%"}>
            <TodoAccordionDiv id={rowData.id} />
         </td>
      </tr>
   </>
}