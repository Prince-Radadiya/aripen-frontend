import { useContext, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";
import { SlidersHorizontal } from "lucide-react";
import { Dropdown } from "../../Components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../Components/ui/dropdown/DropdownItem";
import Button from "../../Components/ui/button/Button";
import { context } from "../../context/AllData";
import toast from 'react-hot-toast';
import Input from "../../Components/form/input/InputField";
import { useEffect } from "react";



export default function EmployeeAttendance() {

  const [workingToday, setWorkingToday] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const { data } = useContext(context);

  const fetchAttendanceData = async () => {
    const response = await fetch('http://localhost:8000/api/Attendance/AttendanceEmp.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ })
    });
    const attendanceData = await response.json()
    setAttendance(attendanceData.data)

  }

  useEffect(() => {
    fetchAttendanceData();

  }, [])


  const handleInPunch = async () => {
    const response = await fetch('http://localhost:8000/api/Attendance/InPunch.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ empId: data.empId })
    });
    let punchRes = await response.json()
    toast.success(`${punchRes.message}`, { position: 'top-center' });
  }


  const handleOutPunch = async () => {
    const response = await fetch('http://localhost:8000/api/Attendance/OutPunch.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ empId: data.empId, workingToday })
    });
    let punchRes = await response.json()
    toast.success(`${punchRes.message}`, { position: 'top-center' });
    setWorkingToday("")
  }


  return (
    <div className="admin-attendance-container h-full p-4 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">

      <div className="attendanceButtons flex items-center justify-around mb-4">
        <Button onClick={handleInPunch}>In Punch</Button>
        <form action="" className="flex items-center gap-2" onSubmit={(e) => {
          e.preventDefault();
          handleOutPunch();
        }}>
          <Input
            onChange={(e) => setWorkingToday(e.target.value)}
            required
            type="text" placeholder="Workin today" />
          <Button >Out Punch</Button>

        </form>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Attendance</h3>


        <div className="relative inline-block text-left">
          <button
            className="dropdown-toggle inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          <Dropdown isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
            <DropdownItem>July 2025</DropdownItem>
            <DropdownItem>June 2025</DropdownItem>
            <DropdownItem>May 2025</DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="w-full h-[68vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <Table className="min-w-full text-[15px] border-collapse dark:text-white">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableCell isHeader className="p-3 text-left">Date</TableCell>
              <TableCell isHeader className="p-3 text-left">status</TableCell>
              <TableCell isHeader className="p-3 text-left">workingToday</TableCell>
              <TableCell isHeader className="p-3 text-left">Leave</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendance && attendance.map((entry, idx) => (
              <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                <TableCell className="p-3">{entry.date}</TableCell>
                <TableCell
                  className={`p-3 font-medium ${entry.status === "Present"
                    ? "text-green-500"
                    : entry.status === "Absent"
                      ? "text-red-500"
                      : "text-yellow-500"
                    }`}
                >
                  {entry.status}
                </TableCell>
                <TableCell className="p-3  font-medium">{entry.workingToday}</TableCell>
                <TableCell className="p-3  font-medium">{entry.totalHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

}
