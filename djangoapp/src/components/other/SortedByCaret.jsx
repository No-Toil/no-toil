import React from "react"

export default function SortedByCaret(props) {
   const { sortedBy, columnName } = props

   if (typeof sortedBy !== "string" ||  typeof columnName !== "string" ||
      !sortedBy.toLowerCase().includes(columnName.toLowerCase())) return <></>

   const style = {}

   if (sortedBy.toLowerCase().includes("ascending")) 
      style.transform = "rotate(90deg)"
      
   if (sortedBy.toLowerCase().includes("descending")) 
      style.transform = "rotate(-90deg)"

   return <p style={style}>{"<"}</p>
}
