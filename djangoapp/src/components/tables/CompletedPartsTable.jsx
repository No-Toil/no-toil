import React                     from "react"
import InvalidRow, { isInvalid } from "./InvalidRow"
import SortedByCaret             from "../other/SortedByCaret"
import { sortBy }                from "../../data/sort"
import { useContext }            from "../../contexts/contextProvider"

export default function CompletedPartsTable({filter}) {
   const { activeSidebar } = useContext()
   const { sortedBy, setSortedBy } = useContext()
   const { todoModel, setTodoModel } = useContext()

   const filteredModel = () => todoModel.filter(x => x.status === 5)

   return <table id={filter + "TodoTable"} className="TodoTable">

   <thead>
      <tr>
         
         <td className="titleColumn" onClick={() => {
            if (activeSidebar) return
            sortBy("title", 
               todoModel, setTodoModel,
               { sortedBy, setSortedBy }
            )}
         }>
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
      filteredModel().map(rowData => <tr 
      id={"CompleteTodoRow" + rowData.id} key={rowData.id}>

         <td>{rowData.title}</td>
         <td>{rowData.quantity}</td>
      
      </tr> )}
   </tbody>
</table>
}