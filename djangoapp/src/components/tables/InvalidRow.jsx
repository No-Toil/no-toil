import React            from "react"
import { todo_api_url } from "../../App"

// placeholder object that fetch.catch will set context.todoModel as
export const invalidRow = {
   id: -1,
   title: "invalidRow",
   quantity: -1,
   status: -1,
}

export const isInvalid = todoModel => !Array.isArray(todoModel) ||
   todoModel.length > 0 && todoModel[0] === invalidRow

export default function InvalidRow() {
   return <tr className="InvalidRow">        
      <td colSpan={"100%"}>
         <p> Not valid data </p>
         <a href={todo_api_url} target="_blank" rel="noreferrer">
            <p> Failed to fetch data from {todo_api_url} </p>
         </a>
      </td>
   </tr>
}