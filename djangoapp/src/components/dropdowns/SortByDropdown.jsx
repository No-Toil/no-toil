import React                     from "react"
import { useContext }            from "../../contexts/contextProvider"
import { isMobile } from "../../data/helperFunctions"
import { columnNames, sortBy }   from "../../data/sort"

export default function SortByDropdown() {
   const { activeSidebar } = useContext()
   const { todoModel, setTodoModel } = useContext()
   const { todoDiscarded, setTodoDiscarded } = useContext()
   const { sortedBy, setSortedBy } = useContext()

   function onChange(event) {
      if (event.target.value === undefined) return
      const toBeSortedBy = `${event?.target?.value}`.replace(" — ", '-')
      const obj = { sortedBy, setSortedBy }
      sortBy(toBeSortedBy, todoModel, setTodoModel, obj)
      sortBy(toBeSortedBy, todoDiscarded, setTodoDiscarded, obj)
   }

   const columnNamesWithDirection = [
      ...columnNames.map(columnName => columnName + "-descending"),
      "————————————",
      ...columnNames.map(columnName => columnName + "-ascending"),
   ]

   return <div style={{padding: "1em 0 1em 1em"}}>
      <span style={{flexWrap: "wrap"}}>
         <p>{sortedBy === '' ? "Sort By:" : "Sorted By:"}</p>
         <select value={sortedBy} onChange={onChange} disabled={isMobile && activeSidebar}>
            {columnNamesWithDirection.map(name => {
               return <option key={name} value={name}>
                  {name.replace('-', " — ")}
               </option>
            })}
         </select>
      </span>
   </div>
}
