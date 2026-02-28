import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

const SalarySlip = ({data}) => {
    const [emp, setemp] = useState([])
    
 const handelsubmit = async () => {

    const response = await fetch('https://aripen-backend.onrender.com/api/employees/EmployeeSlip.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ empId: record.employeeId })
    });
    let employee = await response.json()
    setemp(employee)
  }
  useEffect(() => {
   handelsubmit()
  }, [])

//   const employee = emp.map((e,idx)=>{
//     e.empId===data.employeeId
//   })


  

    // const location = useLocation();
    // const { record } = location.state || {};

    return (
        <div className="w-[210mm] h-[297mm] mx-auto bg-white dark:bg-gray-900 text-black dark:text-white p-10 font-sans text-sm shadow-md border border-gray-300 dark:border-gray-700 relative">
            {/* Company Header */}
            <header className="border-b pb-4 mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">AriPen Pvt. Ltd.</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">123, Tech Park, Surat, Gujarat</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Email: hr@yourcompany.com | Phone: +91-1234567890
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">GSTIN: 24ABCDE1234F1Z5</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Salary Slip</h2>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Month: {record.month}</p>
                </div>
            </header>

            {/* Employee Info */}
            <section className="grid grid-cols-2 gap-4 mb-6">
                <div><span className="font-semibold">Salary ID:</span> {record.salaryId}</div>
                <div><span className="font-semibold">Employee ID:</span> {record.employeeId}</div>
               
                <div><span className="font-semibold">Employee Name:</span> {emp.name}</div>
                <div><span className="font-semibold">Designation:</span> {emp.designation}</div>
                <div><span className="font-semibold">Department:</span> {emp.department}</div>
                <div><span className="font-semibold">Payment Date:</span> {record.paymentDate}</div>
            </section>

            {/* Salary Breakdown */}
            <section className="border-y py-4 grid grid-cols-2 gap-10 mb-6">
                <div>
                    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b pb-1">Earnings</h3>
                    <div className="flex justify-between py-1">
                        <span>Basic Salary</span>
                        <span>₹ {record.basicSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Allowance</span>
                        <span>₹ {record.allowance.toLocaleString()}</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 border-b pb-1">Deductions</h3>
                    <div className="flex justify-between py-1">
                        <span>Standard Deduction</span>
                        <span>₹ {record.deduction.toLocaleString()}</span>
                    </div>
                </div>
            </section>

            {/* Net Salary */}
            <section className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Net Salary (in ₹):</h3>
                <span className="text-green-600 dark:text-green-400 font-bold text-lg">₹ {record.netSalary.toLocaleString()}</span>
            </section>

            {/* Footer Note */}
            <footer className="border-t pt-4 text-xs text-gray-500 dark:text-gray-400">
                <p><strong>Note:</strong> This is a computer-generated salary slip and does not require any signature.</p>
            </footer>

            {/* PAID Stamp */}
            <div className="absolute bottom-16 right-10 opacity-80">
                <div className="border-4 border-green-600 text-green-600 text-center font-bold px-6 py-3 rounded-md rotate-[-20deg] w-40 text-xs shadow-sm">
                    <div className="text-xl leading-tight">PAID</div>
                    <div className="mt-1 text-[11px]">AriPen Pvt. Ltd.</div>
                    <div className="text-[10px]">{record.paymentDate}</div> 
                </div>
            </div>
        </div>
    );
};

export default SalarySlip;
