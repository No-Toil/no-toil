import axios            from "axios"
import { todo_api_url } from "../../../App"
import { postRow } from "../crud"

/************************************************************
 * On CreateTodoForm Submit
 ************************************************************/
export async function onSubmit(event) {
   event.preventDefault()

   try {
      if (!event.target.elements) throw new Error(`invalid event ${event}`)

      const elements = Array.from(event.target.elements)
      let chunks = []
   
      elements.forEach(element => {
   
         // ignore anything except for the values we'll submit in our form
         if (!(String(element.id).includes("RowMid") ||
               String(element.id).includes("RowStart"))) return // continue
   
         // new chunk
         if (!chunks.length || String(element.id).includes("RowStart"))
            chunks.push([])
   
         // add each new value to last chunk
         chunks[chunks.length - 1].push(element)
      })
   
      chunks = chunks.filter(
         // only parse when 'title' field exists, use default for the rest
         chunk => chunk[0].value !== ''

      ).map(chunk => {
         // parse chunk into data
         const chunkObj = {}
         
         chunk.forEach(element => {
            let value = element.value
            
            // handle sets to quantity
            if (["quantity"].includes(element.name)) {
               if (isNaN(value) || value <= 0) value = 1 // default 1 
               value *= 18 // sets to quantity
            }
            
            // handle sets to quantity
            if (["status"].includes(element.name)) {
               if (typeof value === "string") value = parseInt(value)
               if (isNaN(value)) throw new Error("status val parsing error")
               if (value < 0 || value > 5) value = 0 // min-max
            }
            
            // handle str to bool (toOil/highPriority)
            if (["toOil", "highPriority"].includes(element.name)) {
               if (typeof value === "string") 
                  value = value.toLowerCase() === "true"
               else throw new Error(`non-string boolean repr ${value}`)
            }
            
            chunkObj[element.name] = value
         })
   
         return chunkObj
      }).filter(element => element !== undefined)
   
      // pull the trigger
      chunks.forEach(chunk => postRow(chunk, "Request:"))

      onReset(event)
   }

   catch (error) {
      console.error(error)
   }
}

export async function onReset(event) {
   event.target.reset() // magic all knowing button
   document.querySelectorAll("form#CreateTodoForm input").forEach(node => {
      if (node.type === "checkbox") node.value = false
   })
}