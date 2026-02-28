import { createContext, useEffect, useState } from "react";

export const context = createContext()

function AllData({ children }) {
    const [data, setData] = useState({})
    const [projectData, setprojectData] = useState([])
    const [AllTask, setAllTask] = useState([])
    const [adminallEmp, setadminallEmp] = useState([])
    const [TotalTaskAdmin, settotalTaskAdmin] = useState([])




    useEffect(() => {
        // console.log(projectData);
    }, [data])

    return (
        <context.Provider value={{ data, setData, projectData, setprojectData, AllTask, setAllTask,adminallEmp, setadminallEmp,TotalTaskAdmin, settotalTaskAdmin }}
        >{children}
        </context.Provider>
    )
}


export default AllData
