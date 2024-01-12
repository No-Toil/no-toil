import { todo_api_url } from "../App"

export const columnNames = [
   "id",
   "quantity",
   "status",
   "toOil",
   "highPriority",
   "lastModified",
   "partNumber",
   "title",
]

function sortByCallback(sortCallback, {arr, setArr}) {
   if (!Array.isArray(arr)) setArr([])
   let newSortedBy = [...arr]
   newSortedBy.sort(sortCallback) // sorts the array *in place*
   if (setArr) setArr(newSortedBy)
   return newSortedBy
}

export function performSort(descending, columnName, arr, setArr) {
   columnName = columnName.toLowerCase()

   if (descending) {
      switch (columnName) {
         // numbers/booleans/dates
         case "id":
         case "quantity":
         case "status":
         case "toOil":
         case "highpriority":
         case "lastmodified":
            return sortByCallback(
               (a, b) => a[columnName] - b[columnName], 
               {arr, setArr}
            )
         
         // text
         case "partnumber":
         case "title":
            return sortByCallback(
               (a, b) => a[columnName].localeCompare(b[columnName]), 
               {arr, setArr}
            )

         default:
            console.log("'columnName' - descending invalid:", columnName)
            break
      }
   }
   
   else {
      switch (columnName) {
         // numbers/booleans/dates
         case "id":
         case "quantity":
         case "status":
         case "toOil":
         case "highpriority":
         case "lastmodified":
            return sortByCallback(
               (b, a) => a[columnName] - b[columnName], 
               {arr, setArr}
            )
         
         // text
         case "partnumber":
         case "title":
            return sortByCallback(
               (b, a) => a[columnName].localeCompare(b[columnName]), 
               {arr, setArr}
            )

         default:
            console.log("'columnName' - ascending invalid:", columnName)
            break
      }
   }
}

export function sortBy(which, arr, setArr, {sortedBy, setSortedBy}) {

   // exception handling: undefined values
   try {
      if (!Array.isArray(arr)) throw Error(
         arr + " is not iterable... " + 
         "please wait for the application to fetch data from " + 
         todo_api_url + " and set it in the global context."
      )
   }
   catch (error) {
      console.warn("Error in sortBy(str, context):", error)
      return
   }

   // strip column names
   const contextSortedBy = (!sortedBy) ? "" :
      sortedBy.replace("-descending", '').replace("-ascending", '')
   const whichSortedBy = 
      which.replace("-descending", '').replace("-ascending", '')

   // handle which column name to sort by
   const toBeSortedBy = (contextSortedBy === whichSortedBy) ? 
      contextSortedBy : whichSortedBy

   // set descending (default to true unless specified)
   let descending = !which.includes("ascending")
   
   // toggle descending if existing context value matches selected sort value
   if ((contextSortedBy === whichSortedBy) && sortedBy) {
      descending = !sortedBy.includes("descending")
   }

   // reset which based on column name and descending boolean var 
   // and save to context
   if (setSortedBy) setSortedBy(
      toBeSortedBy + (descending ? "-descending" : "-ascending")
   )

   // now, perform sort
   performSort(descending, toBeSortedBy, arr, setArr)
}