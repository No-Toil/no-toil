import React            from "react"
import { deleteAll }    from "../crud"
import { useContext }   from "../../../contexts/contextProvider"

export default function DeleteAllDiscardedForm() {
   const { todoDiscarded, activeSidebar } = useContext()

   return <form id="DeleteDiscardedPartsForm">
      <button className="deleteButton" 
      onClick={event => {
         event.preventDefault()
         if (activeSidebar) return
         deleteAll(todoDiscarded)
      }}> 
      
         <p>Remove All Discarded Parts</p>

      </button>
   </form>
}