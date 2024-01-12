import React               from "react"
import * as buttons        from "../buttons"
import { UpdateTodoForm }  from "../forms"
import { useContext }      from "../../contexts/contextProvider"

export default function TodoAccordionDiv(props) {
   const { id }                     = props
   const { todoModel }              = useContext()
   const [ showMore, setShowMore ]  = React.useState(false)
   const colWidth                   = 100

   const rowData = () => todoModel?.filter(r => r.id === id).shift()

   return <div className={id ? id : "TodoAccordionDiv"}>
      <UpdateTodoForm id={id} />

      <buttons.AccordionButton 
      selected={showMore} setSelected={setShowMore}
      style={{position: "relative", margin: ".3em", paddingRight: "1em"}}>
         <p>

            Show More
            
         </p>
      </buttons.AccordionButton>

      {showMore && <div style={{margin: ".3em"}}>
         <table style={{wordWrap: "break-word"}}>
            <tbody>
               
               <tr>
                  <td width={colWidth}>id:</td>
                  <td>{rowData().id}</td>
               </tr>
               <tr>
                  <td width={colWidth}>title:</td>
                  <td>{rowData().title}</td>
               </tr>
               <tr>
                  <td width={colWidth}>quantity:</td>
                  <td>{rowData().quantity}</td>
               </tr>
               <tr>
                  <td width={colWidth}>toOil:</td>
                  <td>{rowData().toOil ? "True" : "False"}</td>
               </tr>
               <tr>
                  <td width={colWidth}>status:</td>
                  <td>{rowData().status}</td>
               </tr>
               <tr>
                  <td width={colWidth}>highPriority:</td>
                  <td>{rowData().highPriority ? "True" : "False"}</td>
               </tr>
               <tr>
                  <td width={colWidth}>lastModified:</td>
                  <td>
                     {`${new Date(rowData().lastModified).toDateString()}
                     ${new Date(rowData().lastModified).toLocaleTimeString()}`}
                  </td>
               </tr>
               <tr>
                  <td width={colWidth}><em>partNumber:</em></td>
                  <td><em>{rowData().partNumber}</em></td>
               </tr>
               <tr>
                  <td width={colWidth}><em>Discarded</em>:</td>
                  <td><em>{rowData().discarded ? "True" : "False"}</em></td>
               </tr>

            </tbody>
         </table>

         <buttons.TaskEditDeleteButton 
         id={rowData().id} style={{marginTop: 15}} />
      </div>}
   </div>
}