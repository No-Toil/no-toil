import React                     from "react"
import { Tooltip }               from "@mui/material"
import TodoTableRow              from "./TodoTableRow"
import InvalidRow, { isInvalid } from "./InvalidRow"
import * as buttons              from "../buttons"
import SortedByCarret            from "../other/SortedByCaret"
import { sortBy }                from "../../data/sort"
import { isMobile, statusNames } from "../../data/helperFunctions"
import { useContext }            from "../../contexts/contextProvider"

export default function TodoTable({filter, selectedTask, setSelectedTask}) {
   const { activeSidebar } = useContext()
   const { sortedBy, setSortedBy } = useContext()
   const { todoModel, setTodoModel } = useContext()

   const filteredModel = () => (
      todoModel.filter(r => !r.discarded).filter(
         r => statusNames.matches(r.status, filter)
      )
   )

   return <table id={filter + "TodoTable"} className="TodoTable">

      <thead>
         <tr>
            
            <td className="titleColumn" onClick={() => {
               if (activeSidebar) return
               sortBy("title", 
                  todoModel, setTodoModel, 
                  {sortedBy, setSortedBy}
               )
            }}>
               <span style={{width: "100%", flexWrap: "nowrap"}}>
                  <p>
                     Title
                  </p>

                  <SortedByCarret sortedBy={sortedBy} columnName="title" />
               </span>
            </td>

            <td onClick={() => {
               if (activeSidebar) return
               sortBy("quantity-ascending", 
                  todoModel, setTodoModel, 
                  {sortedBy, setSortedBy}
               )
            }}>
               <span style={{width: "100%", flexWrap: "nowrap"}}>
                  <p>
                     {/* stamp/spray should show sets instead of quantity */}
                     {  statusNames.getNumber(filter) <= 1 ? 
                        "Sets" : "Quantity"
                     }
                  </p>

                  <SortedByCarret sortedBy={sortedBy} columnName="quantity" />
               </span>
            </td>

            {!isMobile() &&
               <td onClick={() => {
                  if (activeSidebar) return
                  sortBy("lastModified", 
                     todoModel, setTodoModel, 
                     {sortedBy, setSortedBy}
                  )
               }}>
                  <span style={{width: "100%", flexWrap: "nowrap"}}>
                     <p>Last Modified</p>

                     <SortedByCarret 
                     sortedBy={sortedBy} 
                     columnName="lastModified" />
                  </span>
               </td>
            }

            <td onClick={() => {
               if (activeSidebar) return
               sortBy("highPriority-ascending", 
                  todoModel, setTodoModel, 
                  {sortedBy, setSortedBy}
               )
            }}>
               <span>
                  <Tooltip title="High Priority" placement="left">
                     <p> ! </p>
                  </Tooltip>

                  <SortedByCarret sortedBy={sortedBy} columnName="highPriority" />
               </span>
            </td>

            {!isMobile() && <td align="right">
               <buttons.CollapseAllButton 
               selectedTask={selectedTask} 
               setSelectedTask={setSelectedTask} 
               />
            </td>}
            
         </tr>
      </thead>

      <tbody>
         {/* Invalid Tasks */}
         {isInvalid(filteredModel()) && <InvalidRow />}

         {/* No Tasks */}
         {!isInvalid(filteredModel()) && filteredModel().length <= 0 &&
            <tr><td colSpan={"100%"}>
               <em>No Tasks</em>
            </td></tr>
         }

         {/* Valid Tasks */}
         {!isInvalid(filteredModel()) && 
         filteredModel().map(rowData => (
            <TodoTableRow 
            key={rowData.id} 
            rowData={rowData} 
            selectedTask={selectedTask} 
            setSelectedTask={setSelectedTask} 
            /> 
         ))}

      </tbody>
   </table>
}
