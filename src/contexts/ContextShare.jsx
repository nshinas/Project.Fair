//rafce
import React, { createContext, useState } from 'react'
export const addProjectContext = createContext()
export const editProjectContext = createContext()

const ContextShare = ({children}) => {
    const [addProjectResponse,setAddProjectResponse] = useState("")
    const [editProjectResponse,setEditProjectResponse] = useState("")

  return (
    <addProjectContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
       <editProjectContext.Provider value={{editProjectResponse,setEditProjectResponse}}> 
          {children}
       </editProjectContext.Provider>
    </addProjectContext.Provider>
  )
}

export default ContextShare