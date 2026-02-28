import { useContext, useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";

import { useLocation, useNavigate } from "react-router-dom";
import { BlobProvider } from "@react-pdf/renderer";
import EmpS from '../../Pages/Employee/EmpS'
import { LogIn } from "lucide-react";



function getStatusStyle(status: string) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "unpaid":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function EmployeeSalary() {
  const [salary, setsalary] = useState([])

  const handelsubmit = async () => {


    const response = await fetch('http://aripen-backend.onrender.com/api/employees/EmployeeSalary.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({})
    });
    let AllSalary = await response.json()
    setsalary(AllSalary)
  }

  useEffect(() => {
    handelsubmit()
  }, []);

  const [emp, setemp] = useState([])
  

  const handelsubmitt = async () => {

    const response = await fetch('http://aripen-backend.onrender.com/api/employees/EmployeeProfile.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ empId:record.employeeId })
    });
    let employee = await response.json()
   

    setemp(employee.UserData)
  }
  useEffect(() => {
    handelsubmitt()
  }, [])



  // const location = useLocation();
  // const { record } = location.state || {};

  return (
    <div className="employee-salary-container h-full p-4 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Salary Records</h3>

      <div className="w-full h-[68vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <Table className="min-w-full text-[15px] border-collapse">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 dark:text-white">
            <TableRow>
              <TableCell isHeader className="p-3 text-left">SalaryId</TableCell>
              <TableCell isHeader className="p-3 text-left">Month </TableCell>
              <TableCell isHeader className="p-3 text-left">BasicSalary</TableCell>
              <TableCell isHeader className="p-3 text-left">Allowance</TableCell>
              <TableCell isHeader className="p-3 text-left">Deduction</TableCell>
              <TableCell isHeader className="p-3 text-left">NetSalary</TableCell>
              <TableCell isHeader className="p-3 text-left">Status</TableCell>
              <TableCell isHeader className="p-3 text-left">PaymentDate</TableCell>
              <TableCell isHeader className="p-3 text-left">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {salary.map((record, idx) => (
              <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                <TableCell className="p-3">{record.salaryId}</TableCell>
                <TableCell className="p-3">{record.month}</TableCell>
                <TableCell className="p-3">{record.basicSalary}</TableCell>
                <TableCell className="p-3">{record.allowance}</TableCell>
                <TableCell className="p-3">{record.deduction}</TableCell>

                <TableCell className="p-3 font-medium text-gray-800 dark:text-white">
                  ₹{record.netSalary}
                </TableCell>

                <TableCell className="p-3">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyle(record.status)}`}>
                    {record.status}
                  </span>
                </TableCell>
                <TableCell className="p-3">{record.paymentDate?.slice(0, 10)}</TableCell>


                <TableCell className="p-3">
                  {record.status === "paid" ? (
                    <BlobProvider
                      document={
                        <EmpS
                          record={record}
                          emp={{
                            name: emp.name || 'N/A',
                            designation: emp.designation || 'N/A',
                            department: emp.department || 'N/A'
                          }}
                        />
                      }
                    >
                      {({ url, loading }) =>
                        loading ? (
                          <span className="text-sm text-gray-400 italic">Generating...</span>
                        ) : (
                          <a
                            href={url}
                            download={`SalarySlip_${record.employeeId}.pdf`}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                          >
                            Download Slip
                          </a>
                        )
                      }
                    </BlobProvider>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Not Available</span>
                  )}
                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
