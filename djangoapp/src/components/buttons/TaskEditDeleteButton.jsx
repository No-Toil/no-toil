import React            from "react"
import { Tooltip }      from "@mui/material"
import { todo_api_url } from "../../App"

export default function TaskEditDeleteButton(props) {
   const { id, style } = props

   return <button className="TaskEditDeleteButton" style={style}>
      <Tooltip title={"Note: this will lead you to the API (backend) " + 
      "application to permanently delete this task. This is not reversible " + 
      "-- only use for input typos, canceled orders, etc."}>

         <a href={todo_api_url + id} target="_blank" rel="noreferrer">

            Edit / Delete Task
            
         </a>
      </Tooltip>
   </button>
}