import axios            from "axios"
import { toast }        from "react-toastify"
import { todo_api_url } from "../../App"

/************************************************************
 * axios functions
 ************************************************************/

// delete row from database and from todoModel
export async function deleteRow(data, message=`deleting row`) {

   if (!(data && message)) throw new Error("invalid parameters")

   await axios.delete(`${todo_api_url}${data.id}/`, data)
   .then(request => { console.log(message, request) })
   .catch(error => {throw new Error(error)})
}

// update row in database and todoModel at data.id
export async function patchRow(data, message=`patching row`) {

   if (!(data && message)) throw new Error("invalid parameters")

   await axios.patch(`${todo_api_url}${data.id}/`, data)
   .then(request => { console.log(message, request) })
   .catch(error => { throw new Error(error) })
}

// update row in database and todoModel
export async function postRow(data, message=`posting row`) {

   // error handling
   if (!(data && message)) throw new Error("invalid parameters")

   await axios.post(todo_api_url, data)
   .then(request => { console.log(message, request) })
   .catch(error => { throw new Error(error) })
}

/************************************************************
 * helper functions
 ************************************************************/

export function getPatchInfo(todoModel, newStatus, data) {
   const patchID = todoModel.filter(
      row => row.status === newStatus).filter(
         row => row.title === data.title)[0].id
   
   const patchQuantity = todoModel.filter(
      row => row.status === newStatus).filter(
         row => row.title === data.title)[0].quantity
         
   return { patchID, patchQuantity }
}

// Delete all Discarded/Complete/etc. Items
export async function deleteAll(arr) {

   try {
      // known error conditions 
      if (arr === undefined) throw new Error("'arr' is undefined")
      if (!Array.isArray(arr)) throw new Error("'arr' not an Array")

      // clear all the forms included on the discarded parts page
      const query = "div[contenteditable]"
      const el = document.querySelector(query) 
      console.log({query}, document.querySelector(query))
      if (el) el.innerHTML = ""

      // do nothing to array if filtered list is empty
      if (arr.length <= 0) {
         console.log(`No rows detected matching filter`)
         return
      }

      arr.forEach(row => {

         const data = row
   
         const message = `deleting row ${data.id}:${data.title}`

         try { 
            // perform delete on each matching row
            deleteRow(data, message)
         } 
         
         catch (error) {
            // pass error to catch in upper scope
            throw new Error(`[in forEach] row.id === ${row.id}` + error) 
         }
      })

   } catch (error) {
      console.error(error)
      toast(error)
   }
}
