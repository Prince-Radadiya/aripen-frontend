import { useContext, useEffect, useState } from "react";
import Label from "../../Components/form/Label";
import Input from "../../Components/form/input/InputField";
import TextArea from "../../Components/form/input/TextArea";
import DatePicker from "../../Components/form/date-picker";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";
import Badge from "../../Components/ui/badge/Badge";
import { context } from "../../context/AllData";
import { BlobProvider } from "@react-pdf/renderer";
import EmpSalarySlip from '../../Pages/Employee/EmpSalarySlip'


export default function EmployeeLeave() {

  const { data } = useContext(context)

  const [description, setDescription] = useState("");
  const [LeaveDate, setLeaveDate] = useState("");
  const [Reason, setReason] = useState("");
  const LeaveDetails = {
    leaveDate: LeaveDate,
    reason: Reason,
    description: description,
    empId: data.empId,
    status: 'pending'
  }
  const [TotalLeaves, setTotalLeaves] = useState([])


  const handelLeaveRequest = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/employees/EmployeeLeave.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(LeaveDetails)
    });
    let Leaves = await response.json()
    setDescription(' ')
    setReason('')
  }

  const getAllLeaveRequest = async () => {

    const response = await fetch('http://localhost:8000/api/employees/EmployeeTotalLeave.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ empId: data.empId })
    });
    let TotalLeaves = await response.json()
    setTotalLeaves(TotalLeaves.leaves || [])
  }

  useEffect(() => {
    getAllLeaveRequest();
    const interval = setInterval(() => {
      getAllLeaveRequest();
    }, 10000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="leave-request-form col-span-12 grid grid-cols-12 gap-5 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl">
      <div className="heading ml-5 w-[10vw] dark:text-white font-bold">Request Leave</div>

      <form
        onSubmit={(e) => {
          handelLeaveRequest(e);
        }}
        className="col-span-12 flex gap-6 items-center w-full max-w-4xl mx-auto">
        <div className="w-full flex flex-col gap-6">
          {/* Leave Date */}
          <div className="w-full relative z-[50]">
            <DatePicker
              id="leave-date"
              label="Leave Date"
              placeholder="Select leave date"
              onChange={([date]) => {
                const formattedDate = date?.toISOString().split("T")[0];
                setLeaveDate(formattedDate);
              }}
            />
          </div>



          {/* Reason */}
          <div className="w-full">
            <Label htmlFor="reason">Reason</Label>
            <Input
              onChange={(e) => setReason(e.target.value)}
              type="text" id="reason" placeholder="Sick leave, personal, etc." />
          </div>

          {/* Description */}
          <div className="w-full">
            <Label>Description</Label>
            <TextArea
              value={description}
              onChange={(value) => setDescription(value)}
              rows={6}
              placeholder="Explain your leave request..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Request Leave
            </button>


         


          </div>
        </div>
      </form>
      <div className="w-full h-[68vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 col-span-12 dark:text-white">
        {/* Leave Table */}
        <Table className="min-w-full text-[15px] border-collapse">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 text-whitetask">
            <TableRow>
              <TableCell isHeader className="p-3 text-left">leave Id </TableCell>
              <TableCell isHeader className="p-3 text-left">reason </TableCell>
              <TableCell isHeader className="p-3 text-left">date</TableCell>
              {/* <TableCell isHeader className="p-3 text-left">Due Date</TableCell>
            <TableCell isHeader className="p-3 text-left">Action</TableCell> */}
              <TableCell isHeader className="p-3 text-left">Status</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {TotalLeaves?.map((leave, idx) => (
              <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                <TableCell className="p-3">{leave.leaveId}</TableCell>
                <TableCell className="p-3 font-medium text-gray-800 dark:text-white">{leave.reason}</TableCell>
                <TableCell className="p-3 text-sm">{leave.leaveDate}</TableCell>
                {/* <TableCell className="p-3">{task.date}</TableCell> */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      leave.status === "approved"
                        ? "success"
                        : leave.status === "pending"
                          ? "warning"
                          : "error"
                    }
                  >
                    {leave.status || "N/A"}
                  </Badge>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
