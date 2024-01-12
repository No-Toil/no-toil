import React                     from "react"
import { Tooltip }               from "@mui/material"
import { onSubmit, onReset }     from "./crud"
import CreateTodoFormRow         from "./CreateTodoFormRow"
import CreateTodoFormHeaderRow   from "./CreateTodoFormHeaderRow"
import { useContext }            from "../../../contexts/contextProvider"
import * as h                    from "../../../data/helperFunctions"

const bottomButtonsStyle = {
   border: "1px solid lightgray",
   padding: ".5em"
}

export default function CreateTodoForm({style}) {
   const { activeSidebar } = useContext()
   const [ rowsAmount, setRowsAmount ] = React.useState(5)

   return <form id="CreateTodoForm" style={style} 
   onSubmitCapture={onSubmit} onReset={onReset}>
      <span>
         <table>

            <thead>
               <CreateTodoFormHeaderRow />
            </thead>

            <tbody>
               {h.range(rowsAmount).map(
                  i => <CreateTodoFormRow key={i} i={i} />
               )}
            </tbody>
         </table>
      </span>

      {/* Bottom Buttons Bar */}
      <span style={{marginTop: "1em", gap: "1em"}}>

         {/* Submit Button */}
         <Tooltip title="Add items to table and clear this form.">
            <button type="submit" 
            id="submitCreateTodoFormButton" 
            style={bottomButtonsStyle}>
               <input type="submit" value="Submit" />
            </button>
         </Tooltip>

         {/* Reset All Input Fields Button */}
         <Tooltip title="Clear this form.">
            <button type="reset"
            id="resetCreateTodoFormButton" 
            style={bottomButtonsStyle} >
               <input type="reset" value="Reset" />
            </button>
         </Tooltip>

         {/* Spacer */}
         <div style={{flexGrow: 1}}></div>

         {/* Add 5 Rows Button */}
         <Tooltip title="Extend the amount of rows in this form by five.">
            <button type="button"
            id="add5RowsButton" 
            style={bottomButtonsStyle}
            onClick={event => {
               console.log("add five rows", event)
               if (activeSidebar) return // disable
               setRowsAmount(rowsAmount + 5) 
            }}>
               <p>Add 5 Extra Rows</p>
            </button>
         </Tooltip>
      </span>
   </form>
}
