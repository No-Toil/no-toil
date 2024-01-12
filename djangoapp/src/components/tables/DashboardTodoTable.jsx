import React                     from "react"
import { Tooltip }               from "@mui/material"
import InvalidRow, { isInvalid } from "./InvalidRow"
import DashboardTableRow         from "./DashboardTableRow"
import * as buttons              from "../buttons"
import SortedByCaret             from "../other/SortedByCaret"
import * as h                    from "../../data/helperFunctions"
import { useContext }            from "../../contexts/contextProvider"
import { sortBy }                from "../../data/sort"

export default function DashboardTodoTable({selectedTask, setSelectedTask}) {
   const { activeSidebar } = useContext()
   const { sortedBy, setSortedBy } = useContext()
   const { todoModel, setTodoModel } = useContext()

   return <table id="DashboardTodoTable">

      <thead>
         <tr>
            
            <td className="titleColumn" onClick={() => {
               if (activeSidebar) return
               sortBy("title", 
                  todoModel, setTodoModel,
                  { sortedBy, setSortedBy }
               )
            }}>
               <span>
                  <p>Title</p>

                  <SortedByCaret sortedBy={sortedBy} columnName="title" />
               </span>
            </td>
            
            <td onClick={() => {
               if (activeSidebar) return
               sortBy("quantity-ascending", 
                  todoModel, setTodoModel,
                  { sortedBy, setSortedBy }
               )
            }}>
               <span>
                  <p>Quantity</p>

                  <SortedByCaret sortedBy={sortedBy} columnName="quantity" />
               </span>
            </td>
            
            {!h.isMobile() &&
               <td onClick={() => {
                  if (activeSidebar) return
                  sortBy("lastModified", 
                     todoModel, setTodoModel,
                     { sortedBy, setSortedBy }
                  )
               }}>
                  <span>
                     <p>Date Modified</p>

                     <SortedByCaret 
                     sortedBy={sortedBy} 
                     columnName="lastModified" />
                  </span>
               </td>
            }
            
            <td onClick={() => {
               if (activeSidebar) return
               sortBy("status", 
                  todoModel, setTodoModel,
                  { sortedBy, setSortedBy }
               )
            }}>
               <span>
                  <p>Status</p>

                  <SortedByCaret sortedBy={sortedBy} columnName="status" />
               </span>
            </td>
            
            <td onClick={() => {
               if (activeSidebar) return
               sortBy("highPriority-ascending", 
                  todoModel, setTodoModel,
                  { sortedBy, setSortedBy }
               )
            }}>
               <Tooltip title="High Priority" placement="top">
                  <span>
                     <p>!</p>

                     <SortedByCaret 
                     sortedBy={sortedBy} 
                     columnName="highPriority" />
                  </span>
               </Tooltip>
            </td>
            
            {!h.isMobile() && <td align="center" >
               <buttons.CollapseAllButton 
               selectedTask={selectedTask} 
               setSelectedTask={setSelectedTask} />
            </td>}
         </tr>
      </thead>

      <tbody>
         {/* Invalid Tasks */}
         {isInvalid(todoModel) && <InvalidRow />}

         {/* No Tasks */}
         {!isInvalid(todoModel) && todoModel.length <= 0 &&
            <tr><td colSpan={"100%"}>
               <em>No Tasks</em>
            </td></tr>
         }

         {/* Valid Tasks */}
         {!isInvalid(todoModel) && 
         todoModel.filter(r => r.id).filter(r => !r.discarded).map(rowData => 
            <DashboardTableRow 
            key={rowData.id} rowData={rowData} 
            selectedTask={selectedTask} 
            setSelectedTask={setSelectedTask}
            />
         )}

      </tbody>
   </table>
}
