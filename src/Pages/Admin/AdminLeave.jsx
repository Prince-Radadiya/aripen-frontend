import Badge from "../../Components/ui/badge/Badge";
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";

function AdminLeave() {
  const [LeaveData, setLeaveData] = useState([])
  const [LeaveDataSend, setLeaveDataSend] = useState({
    Id: "",
    Action: ""
  });



  const handleAcceptTask = (id) => {
    setLeaveData(prev =>
      prev.map(task =>
        task.leaveId === id ? { ...task, status: "approved" } : task
      )
    )

    setLeaveDataSend({
      Id: id,
      Action:"approved"
    })

  };




  const handelsubmit = async () => {

    const response = await fetch('https://aripen-backend.onrender.com/api/Admin/AdminLeave.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },

      // body: JSON.stringify({ LeaveDataSend })
    });
    let totalProjectAdmin = await response.json()
    setLeaveData(totalProjectAdmin)
  }
  useEffect(() => {
    handelsubmit()
  }, [])


  const handelsubmitsend = async () => {

    const response = await fetch('https://aripen-backend.onrender.com/api/Admin/Leave.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify( LeaveDataSend ) 
    });
    let Leaverequest = await response.json()

  }
  useEffect(() => {
    handelsubmitsend()
    
  }, [LeaveDataSend])

  return (
    <div>
      <div className="w-full h-[68vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 col-span-12">
        {/* Leave Table */}
        <Table className="min-w-full text-[15px] border-collapse">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 dark:text-white">
            <TableRow>
              <TableCell isHeader className="p-3 text-left">leave Id </TableCell>
              <TableCell isHeader className="p-3 text-left">reason </TableCell>
              <TableCell isHeader className="p-3 text-left">date</TableCell>
              <TableCell isHeader className="p-3 text-left">description</TableCell>
              <TableCell isHeader className="p-3 text-left">Action</TableCell>
              <TableCell isHeader className="p-3 text-left">Status</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {LeaveData.map((task, idx) => (
              <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                <TableCell className="p-3">{task.leaveId}</TableCell>
                <TableCell className="p-3 font-medium text-gray-800 dark:text-white">{task.reason}</TableCell>
                <TableCell className="p-3 text-sm">{task.leaveDate}</TableCell>
                <TableCell className="p-3">{task.description}</TableCell>


                <TableCell className="p-3  text-gray-500 text-theme-sm dark:text-gray-400">
                  {task.status === "pending" && (
                    <button
                      onClick={() => handleAcceptTask(task.leaveId)} 
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Accept Leave
                    </button>
                  )}

                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      task.status === "approved"
                        ? "success"
                        : task.status === "pending"
                          ? "warning"
                          : "error"
                    }
                  >
                    {task.status || "N/A"}
                  </Badge>
                </TableCell>



              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminLeave
