import React                     from "react"
import { Tooltip }               from "@mui/material"
import { documentTitleSuffix }   from "../App"
import { CompletedPartsTable }   from "../components/tables"
import * as buttons              from "../components/buttons"
import { useContext }            from "../contexts/contextProvider"

export default function CompletedParts() {
   const context = useContext()

   React.useEffect(() => {
      document.title = "Completed Parts"
      document.querySelector("#headerTitle").innerText = document.title
      document.querySelector("title").textContent = document.title + 
         documentTitleSuffix + ' ' + new Date().toLocaleString()
   }, [])

   return <div id={ document.title.replace(' ', '') }>
      <span id="topButtons" style={{flexWrap: "wrap"}}>
         <buttons.PreviousPageButton to="Bag" />
         <buttons.PrintAndDeleteAllCompleteButton />
      </span> 
      
      <CompletedPartsTable context={ context } />

      <br></br>

      <Tooltip style={{width: "fit-content"}} title="">
         <p>Notes:</p>
      </Tooltip>

      <div contentEditable={true} /> 

      <span style={{marginTop: "3em"}}>
         <buttons.BackToDashboardButton />
      </span>
   </div>
}