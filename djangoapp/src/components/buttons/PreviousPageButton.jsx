import React            from "react"
import { NavLink }      from "react-router-dom"
import { statusNames }  from "../../data/helperFunctions"
import { useContext }   from "../../contexts/contextProvider"

export default function PreviousPageButton(props) {
   const { to } = props
   const { activeSidebar } = useContext()

   const previousUrl = () => to ?? statusNames.previousUrl(window)

   return <button>
      <NavLink to={'/' + previousUrl()} onClick={event => {
         if (activeSidebar) event.preventDefault()
      }}>
         ← Go to {previousUrl()}
      </NavLink>
   </button>
}