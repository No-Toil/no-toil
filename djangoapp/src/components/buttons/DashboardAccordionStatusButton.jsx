import React   from "react"
import * as h  from "../../data/helperFunctions"

export default function DashboardAccordionStatusButton(props) {
   const { status } = props

return <button className="DashboardAccordionStatusButton">
   <a href={h.statusNames.getUrl(status)} width={0}>
      Status: [{status}] Go to '{`${h.capitalize(h.statusNames.get(status))}`}'
   </a>
</button>
}