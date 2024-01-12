import React         from "react"
import * as h        from "../../../data/helperFunctions"
import { Tooltip }   from "@mui/material"

export default function CreateTodoFormHeaderRow() {
   return <tr>
      <td style={{width: "100%"}} > 
         <p>
            Title
         </p>
      </td>
      <td style={{minWidth: "100px"}}> 
         <Tooltip title="1 Set = 18 Parts" placement="top">
            <p>
               Sets
            </p> 
         </Tooltip>
      </td>
   
      <td>
         <Tooltip placement="top" title={
            "Oil? Click this if the filter requires oiling." + 
            "(Oiled filters usually have a hyphen, i.e. @000-00)" + 
            "Leaving this box unchecked will skip the oiling step."
         }>
            <p>
               Oil 
            </p>
         </Tooltip>
      </td> 
      
      {!h.isMobile() &&
      
         <td>
            <p>
               Status 
            </p> 
         </td> 
         
      }

      <td style={{width: 20, whiteSpace: "nowrap"}}> 
         <Tooltip title="High Priority" placement="top">
            <p>
               {"!"} 
            </p>
         </Tooltip>
      </td> 

   </tr>
}