import React                  from "react"
import { TodoAccordionDiv }   from "../accordionDivs"
import * as Buttons           from "../buttons"
import * as h                 from "../../data/helperFunctions"
import { useContext }         from "../../contexts/contextProvider"

export default function TodoTableRow(props) {
   const { activeSidebar } = useContext()
   const { rowData, selectedTask, setSelectedTask } = props

   const lastModified = () => new Date(rowData.lastModified)?.toLocaleDateString()

   const onClick = () => {
      if (activeSidebar) return // disable
      setSelectedTask(selectedTask === rowData.id ? -1 : rowData.id)
   }

   return <>

      {/* Todo Table Row */}
      <tr onClick={onClick}>

         <td>
            <p>
               {rowData.title}
            </p>
         </td>

         <td>
            <p>
               {  rowData.status <= 1 ? 
                  parseInt(rowData.quantity / 18) : 
                  rowData.quantity
               }
            </p>
         </td>

         {!h.isMobile() &&
            <td>
               <p>
                  {lastModified()}
               </p>
            </td>
         }

         <td>
            <p>
               {rowData.highPriority ? "!" : ""}
            </p>
         </td>

         {!h.isMobile() && <td>
            <Buttons.AccordionButton 
            style={{flexWrap: "nowrap"}}
            selected={selectedTask === rowData.id}>
               {selectedTask === rowData.id ? "cancel" : "update"}
            </Buttons.AccordionButton>
         </td>}
      </tr>

      {/* Dropdown Row (Hidden Todo Accordion Div) */}
      <tr className={
         selectedTask === rowData.id ? 
         "AccordionRow Expanded" : 
         "AccordionRow"}
      >
         <td colSpan={"100%"}>
            <TodoAccordionDiv id={rowData.id} rowData={rowData} />
         </td>
      </tr>
   </> 
}