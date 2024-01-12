import React                     from "react"
import { Tooltip }               from "@mui/material"
import { onUpdate, onDiscard }   from "./crud"
import { useContext }            from "../../../contexts/contextProvider"

export default function UpdateTodoForm(props) {
   const { id } = props
   const { todoModel, activeSidebar } = useContext()

   const rowData     = () => todoModel?.filter(r => r.id === id).shift()
   const sets        = () => rowData().status <= 1
   const placeholder = () => sets() ? 
      parseInt(rowData().quantity / 18) || 0 : rowData().quantity

   if (placeholder() <= 0) throw new Error("invalid rowData.quantity")
   if (!rowData())         throw new Error("rowData doesn't exist")
   if (!rowData().title)   throw new Error("rowData.title doesn't exist")
   if (isNaN(rowData().status))
      throw new Error("rowData.status doesn't exist")

   // placeholder automatically updates based on state
   const [ numVal, setNumVal ] = React.useState(placeholder())
   React.useEffect(() => {setNumVal(placeholder())}, [ todoModel ])

   return <form className="UpdateTodoForm flexbox">

      <div className="left">
         <p><em>Update '{rowData().title}':</em></p>
      </div>

      <span style={{width: "fit-content"}}>

         <em>{sets() ? 
            <Tooltip title="1 Set = 18 Each"><p>Sets:</p></Tooltip> :
            <p>Quantity:</p>
         }</em>


         <input id={`TodoAccordionDivCompleteValue${id}`} 
         style={{width: "5em"}}
         name="quantity" type="number" 
         value={numVal} min={0} 
         onChange={event => { setNumVal(event.target.value) }} />
      
      </span>

      <div style={{display: "inline"}}>

         {/* Update Button */}
         <button onClick={async event => {
            event.preventDefault()
            if (activeSidebar) return
            const count = parseInt(sets() ? numVal * 18 : numVal)
            await onUpdate(todoModel, rowData(), count)
         }}>

            Update

         </button>

         {/* Discard Button */}
         <button style={{marginLeft: "1em"}} onClick={async event => {
            event.preventDefault()
            if (activeSidebar) return
            await onDiscard(rowData())
         }}>

            Discard

         </button>
      </div>
   </form>
}