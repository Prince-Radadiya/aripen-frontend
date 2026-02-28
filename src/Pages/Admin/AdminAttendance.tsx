
import { context } from "../../context/AllData";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminCalender from "./AdminCalender";



export default function AdminAttendance() {
  const { adminallEmp, setadminallEmp } = useContext(context)
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const AdminAttendance = async () => {

    const response = await fetch('https://aripen-backend.onrender.com/api/Admin/AdminTotalEmployee.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ })
    });
    let totalemployees = await response.json()
    setadminallEmp(totalemployees)

  }


  useEffect(() => {
    AdminAttendance();
  }, []);




  const handleViewMonth = (empId) => {
    navigate(`/admin/calendar/${empId}`);

  };
  const handleViewYear = (empId) => {
    navigate(`/admin/YearCalander/${empId}`);

  };

  return (

    <div className="admin-employee-container h-full p-4 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 z-40  flex flex-col gap-[1.5vw] ">

      <div className="flex flex-col  mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Employees
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>



      <div className="w-full overflow-y-auto h-[70vh] border rounded-2xl border-gray-200 dark:border-gray-800 dark:bg-gray-900 ">
        <div className="min-w-[900px] max-h-[68vh] overflow-auto relative">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <tr>
                {["Emp ID", "Photo", "Name", "Designation", "Attendance", "JoinDate"].map((heading, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {adminallEmp.map((item, idx) => (
                <tr key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02]">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.empId}</td>
                  <td className="py-3 px-4">
                    <img
                      src={item.profilePhoto}
                      alt="Employee"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.name}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.designation}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 flex gap-3">
                    <button
                      onClick={() => handleViewMonth(item.empId)}
                      className="bg-blue-700 p-3 pl-4 pr-4 rounded-sm text-white font-semibold">Month</button>
                    <button
                      onClick={() => handleViewYear(item.empId)}
                      className="bg-blue-700 p-3 pl-4 pr-4 rounded-sm text-white font-semibold">Year </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {item.joinDate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>



    </div>

  );
}
