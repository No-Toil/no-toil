import React                     from "react"
import { NavLink, Link }         from "react-router-dom"
import { Tooltip, IconButton }   from "@mui/material"
import Hamburger                 from "hamburger-react"
import * as h                    from "../../data/helperFunctions"
import { useContext }            from "../../contexts/contextProvider"
import { todo_api_url }          from "../../App"

const sidebarIconButtonStyle = {
   borderRadius: 10,
   backgroundColor: "inherit",
   fontSize: ".75em",
}

export default function Sidebar() {
   const { activeSidebar, setActiveSidebar } = useContext()

   return <div id="sidebar" className={activeSidebar ? "activeSidebar" : ""} >

      <div id="SidebarContent">

         <div id="SidebarContentTop">

            {/* Sidebar Title Div (Contiains Text and Close Icon) */}
            <div id="sidebarTitle">

               {/* Sidebar Title Text Link */}
               <Link to="/" id="sidebarTitleLinkText"
               className="dark:text-white text-slate-900">
                  <h1 id="sidebarTitle">
                     Dashboard
                  </h1>
               </Link>

               {/* Close Icon */}
               {h.isMobile() ?
                  <Hamburger toggle={setActiveSidebar} toggled={true} /> 
               : "" }

            </div>
         
            <div className="TaskSidebarLinks">

               {/* Sidebar Page Links (Collection) */}
               {h.statusNames.getArray().map(
                  (item, i) => (
                     <div key={item} className="sidebarLink">

                        <NavLink to={h.statusNames.getUrl(i)}>

                           <Tooltip title="" arrow={true} placement="right">

                              <IconButton id="sidebarIconButton" 
                              className="transparentBackground"
                              aria-label={item} sx={sidebarIconButtonStyle}>

                                 <p className="text-left uppercase tracking-widest dark:text-white text-slate-600">
                                    {item.replace("-", " ")}
                                 </p>

                              </IconButton>
                           </Tooltip>


                        </NavLink>
                     </div> /* End Sidebar Link Div */
                  )
               )} {/* End Sidebar Page Links Collection */}

               <div className="sidebarLink">

                  <NavLink to={"/DiscardedParts"}>

                     <Tooltip title="" arrow={true} placement="right">

                        <IconButton id="sidebarIconButton" 
                        className="transparentBackground"
                        sx={sidebarIconButtonStyle}>

                           <p className="text-left uppercase tracking-widest dark:text-white text-slate-600">
                              <em>Discarded</em>
                           </p>

                        </IconButton>
                     </Tooltip>


                  </NavLink>
               </div>
            </div>
         </div>

         <div id="SidebarContentBottom">

            <div className="sidebarLink relative bottom-0">
               <a href={"http://" + window.location.hostname + ":8000/admin/"}
               target="_blank" rel="noopener noreferrer" >
                  
                  <Tooltip 
                  title={"http://" + window.location.hostname + ":8000/admin/"}
                  arrow={true} placement="right">

                     <IconButton id="sidebarIconButton" 
                     className="transparentBackground"
                     style={{borderRadius: ".3em"}}>

                        <p>
                           Admin
                        </p>
                     </IconButton>
                  </Tooltip>
               </a>
            </div>

            <div className="sidebarLink relative bottom-0">
               <a href={todo_api_url}
               target="_blank" rel="noopener noreferrer" >
                  
                  <Tooltip 
                  title={todo_api_url}
                  arrow={true} placement="right">

                     <IconButton id="sidebarIconButton" 
                     className="transparentBackground"
                     style={{borderRadius: ".3em"}}>

                        <p>
                           API Root
                        </p>
                     </IconButton>
                  </Tooltip>
               </a>
            </div>
            
         </div> {/* end sidebarcontent bottom div */}
      </div> {/* end sidebar content div */}
   </div> /* end sidebar div */
}