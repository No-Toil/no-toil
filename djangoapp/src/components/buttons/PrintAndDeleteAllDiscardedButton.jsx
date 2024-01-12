import React                        from "react"
import { Tooltip }                  from "@mui/material"
import { DeleteAllDiscardedForm }   from "../forms"
import { useContext }               from "../../contexts/contextProvider"

const removeButtonTooltipMsg = "Click to confirm delete." + 
"This will remove all items from this list from the database."

export default function PrintAndDeleteAllDiscardedButton(props) {
   const { activeSidebar } = useContext()
   const [ showRemoveButton, setShowRemoveButton ] = React.useState(false)

   return <> 
      {!showRemoveButton ? // condition

         /* Print Completed Parts Button */
         <Tooltip title="">

            <button 
            style={props.style} 
            onClick={event => {
               event.preventDefault()
               if (activeSidebar) return // disable
               window.print()
               setShowRemoveButton(true)
            }}> 

               <p>Print Discarded Parts</p>

            </button>
         </Tooltip>

         : // else

         /* Remove Completed Tasks Button */
         <Tooltip title={removeButtonTooltipMsg} placement="top">
            <div>
               <DeleteAllDiscardedForm />
            </div>
         </Tooltip>
      }
   </>
}



// todo: print buttons don't properly turn pink right now