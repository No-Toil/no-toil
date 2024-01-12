import React                     from "react"
import InvalidRow, { isInvalid } from "./InvalidRow"
import SortedByCaret             from "../other/SortedByCaret"
import * as h                    from "../../data/helperFunctions"
import { sortBy }                from "../../data/sort"
import { statusNames }           from "../../data/helperFunctions"
import { useContext }            from "../../contexts/contextProvider"

export default function DiscardedPartsTable() {
   const { todoDiscarded, setTodoDiscarded } = useContext()
   const { sortedBy, setSortedBy } = useContext()

   return <table id="DiscardedTable" className="DiscardedTable">

   <thead>
      <tr>
         
         <td className="titleColumn" onClick={() => sortBy("title", 
            todoDiscarded, setTodoDiscarded,
            { sortedBy, setSortedBy }
         )}>
            <span>
               <p>Title</p>
               <SortedByCaret sortedBy={sortedBy} columnName="title" />
            </span>
         </td>
 
         <td onClick={() => {
            if (activeSidebar) return
            sortBy("quantity-ascending", 
               todoDiscarded, setTodoDiscarded,
               { sortedBy, setSortedBy }
            )
         }}>
            <span style={{flexWrap: "nowrap"}}>
               <p>Quantity</p>
               <SortedByCaret sortedBy={sortedBy} columnName="quantity" />
            </span>
         </td>
 
         <td onClick={() => {
            if (activeSidebar) return
            sortBy("status", 
               todoDiscarded, setTodoDiscarded,
               { sortedBy, setSortedBy }
            )
         }}>
            <span style={{flexWrap: "nowrap"}}>
               <p>Status</p>
               <SortedByCaret sortedBy={sortedBy} columnName="status" />
            </span>
         </td>
 
         <td onClick={() => {
            if (activeSidebar) return
            sortBy("highPriority-ascending", 
               todoDiscarded, setTodoDiscarded,
               { sortedBy, setSortedBy }
            )
         }}>
            <span style={{flexWrap: "nowrap"}}>
               <p>{"!"}</p>
               <SortedByCaret sortedBy={sortedBy} columnName="highPriority" />
            </span>
         </td>

      </tr>
   </thead>

   <tbody>
      {/* Invalid Tasks */}
      {isInvalid(todoDiscarded) && <InvalidRow />}

      {/* No Tasks */}
      {!isInvalid(todoDiscarded) && todoDiscarded.length <= 0 &&
         <tr><td colSpan={"100%"}>
            <em>No Tasks</em>
         </td></tr>
      }

      {/* Valid Tasks */}
      {!isInvalid(todoDiscarded) && 
      todoDiscarded.map(rowData => <tr 
      id={"DiscardedTodoRow" + rowData.id} key={rowData.id}>

         <td>{rowData.title}</td>
         <td>{rowData.quantity}</td>
         <td>{h.capitalize(statusNames.get(rowData.status))}</td>
         <td>{rowData.highPriority && "!"}</td>
      
      </tr> )}
   </tbody>
</table>
}