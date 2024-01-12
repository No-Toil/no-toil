import React                     from "react"
import { documentTitleSuffix }   from "../App"
import * as buttons              from "../components/buttons"
import { TodoTable }             from "../components/tables"
import { SortByDropdown }        from "../components/dropdowns"

export default function TaskPageTemplate(props) {
   const { name, sets } = props
   const [ selectedTask, setSelectedTask ] = React.useState(-1)

   React.useEffect(() => {
      document.title = name
      document.querySelector("#headerTitle").innerText = document.title
      document.querySelector("title").textContent = 
         document.title + documentTitleSuffix
   }, [ name ])
   
   return <div id={document.title}>
      <span id="topButtons" style={{flexWrap: "wrap", justifyContent: "space-between"}}>
         <buttons.PreviousPageButton />
         <buttons.NextPageButton />
      </span>
      <span>
         <SortByDropdown />
      </span>

      <TodoTable filter={name} sets={sets}
      selectedTask={selectedTask} 
      setSelectedTask={setSelectedTask} 
      />

      <span style={{marginTop: "3em"}}>
         <buttons.BackToDashboardButton />
      </span>
   </div>
}

export function Stamp() { return <TaskPageTemplate name="Stamp" sets={true} /> }
export function Spray() { return <TaskPageTemplate name="Spray" sets={true} /> }
export function Check() { return <TaskPageTemplate name="Check" /> }
export function Oil()   { return <TaskPageTemplate name="Oil" /> }
export function Bag()   { return <TaskPageTemplate name="Bag" /> }