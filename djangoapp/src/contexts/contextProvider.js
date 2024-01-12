import React from "react"

const Context = React.createContext()

export function ContextProvider({ children }) {
   const [ sortedBy,       setSortedBy,      ] = React.useState("")
   const [ activeSidebar,  setActiveSidebar, ] = React.useState(false)
   const [ wsConnected,    setWsConnected,   ] = React.useState(false)
   const [ todoModel,      setTodoModel,     ] = React.useState([])
   const [ todoDiscarded,  setTodoDiscarded, ] = React.useState([])
 
   return (
      <Context.Provider value={{ 
         sortedBy,         setSortedBy,
         activeSidebar,    setActiveSidebar,
         wsConnected,      setWsConnected,
         todoModel,        setTodoModel,
         todoDiscarded,    setTodoDiscarded,
      }}>{children}</Context.Provider>
   )
}

export const useContext = () => React.useContext(Context)