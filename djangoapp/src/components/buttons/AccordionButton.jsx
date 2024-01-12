import React            from "react"
import { useContext }   from "../../contexts/contextProvider"

export default function AccordionButton({ 
   selected, setSelected, style, onClick, children 
}) {
   const { activeSidebar } = useContext()

   function onClickInherited(event) {
      if (activeSidebar) return
      // toggle [selected] (from props/parent)
      if (setSelected && selected !== undefined) setSelected(!selected)
            
      // any additional functionality (from props)
      if (onClick) onClick(event)
   }
   
   return <span onClick={onClickInherited} style={{...style, gap: ".1em"}}>

      {/* Include Any Child React Objects from props */}
      {children && 
         <button style={{marginRight: "5px"}} className="AccordionButtonChild">
            {children} 
         </button>
      }

      {/* Accordion Button */}
      <button className="AccordionButton"
      style={{
         width: 25,
         height: 25,
         borderRadius: 15,
         transform: selected ? "rotate(-90deg)" : "rotate(0)",
         transition: ".3s",
      }}
      >{"<"}</button>
   </span>
}