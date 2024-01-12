import React         from "react"
import * as Buttons  from "../buttons"

export default function DashboardAccordionDiv(props) {
   const { rowData } = props

   return <span 
   className="DashboardAccordionDiv flexbox" 
   style={{justifyContent: "start", gap: ".5em 2.5em"}}>

      <p>id: '{rowData.id}'</p>
      <p>Title: '{rowData.title}'</p>
      
      <Buttons.DashboardAccordionStatusButton status={rowData.status} />
   </span>
}