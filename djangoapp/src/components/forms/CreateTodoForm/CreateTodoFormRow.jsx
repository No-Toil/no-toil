import React      from "react"
import * as h     from "../../../data/helperFunctions"

export default function CreateTodoFormRow({ i }) {

   const [ toOil, setToOil ] = React.useState(false)
   const [ status, setStatus ] = React.useState(0)
   const [ highPriority, setHighPriority ] = React.useState(false)

   return <tr>
      <td>
         <input 
         name="title"    
         id={`RowStart${i}`}         
         placeholder="Title" 
         type="text"
         style={{width: "100%", minWidth: 100, paddingLeft: ".5em"}}
         />
      </td>
      <td>
         <input 
         name="quantity" 
         type="number"
         id={`RowMid${i}-Quantity`}  
         placeholder={1}
         default={1}
         style={{width: 100, paddingLeft: ".5em"}}
         />
      </td>

      <td>
         <input id={`$RowMid${i}-Oil`}
            name="toOil"
            type="checkbox" 
            value={toOil}
            defaultChecked={false}
            onChange={() => {setToOil(!toOil)}}
         />
      </td>
      
      {!h.isMobile() &&
         <td>
            <select id={`RowMid${i}-Status`} 
            name={"status"} 
            value={status} 
            onChange={event => { setStatus(parseInt(event.target.value)) }}>  

               {h.statusNames.getArray().map((name, i) => {
                  return <option key={name} value={i}>
                     {h.capitalize(name)}
                  </option>
               })}
            </select>
         </td>
      }

      <td>
         <input id={`$RowMid${i}-HighPriority`}
            name={"highPriority"} 
            type="checkbox" 
            style={{height: 20}} 
            value={highPriority}
            onChange={() => {setHighPriority(!highPriority)}}
         />
      </td> 
   </tr>
}
