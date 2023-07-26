import { createContext, useState } from "react";

export const Admin = createContext()

export const AdminProvider = ({children})=>{
    const [adminData,setAdminData] = useState(null)

    return (
        <Admin.Provider value={{adminData,setAdminData}}>{children}</Admin.Provider>
    )

}