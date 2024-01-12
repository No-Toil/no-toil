import React            from "react"
import { useContext }   from "../../contexts/contextProvider"
import { isMobile }     from "../../data/helperFunctions"

export default function CollapseAllButton(props) {
   const { activeSidebar } = useContext()
   const { selectedTask, setSelectedTask } = props

   return <div className="CollapseAllButton">
      <button onClick={() => {
         if (activeSidebar) return // disable
         setSelectedTask(-1)
      }}
      style={{
         visibility: (selectedTask > 0 ? "visible" : "hidden"),
      }}>
         <p>{'-'}</p>
      </button> 
   </div>
}