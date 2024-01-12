import React            from "react"
import { useContext }   from "../../../contexts/contextProvider"
import { deleteAll }    from "../crud"

export default function DeleteAllCompleteForm() {
   const { todoModel, activeSidebar } = useContext()

   return <form id="DeleteCompletedPartsForm">
      <button className="deleteButton" 
      onClick={event => {
         event.preventDefault()
         if (activeSidebar) return
         deleteAll(todoModel.filter(r => r.status === 5))
      }}> 
      
         <p>Remove All Completed Parts</p>

      </button>
   </form>
}