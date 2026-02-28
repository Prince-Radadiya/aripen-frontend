import { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell
} from "../../Components/ui/table";
import { BlobProvider } from "@react-pdf/renderer";
import AdminS from '../Admin/AdminS';

export default function AdminSalary() {
    const [allsalary, setAllsalary] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState({});
    const [loadingEmpId, setLoadingEmpId] = useState(null);

    // Fetch all salary records
    const fetchAllSalaries = async () => {
        const response = await fetch('http://localhost:8000/api/Admin/AdminSalary.php', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setAllsalary(data);
    };

    // Fetch employee details by empId
    const fetchEmployeeDetails = async (empId) => {
        setLoadingEmpId(empId);
        try {
            const res = await fetch(`http://localhost:8000/api/Admin/AdminSlip.php?empId=${empId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const empData = await res.json();
            setSelectedEmp({ ...empData, empId });
        } catch (err) {
            setSelectedEmp({});
        } finally {
            setLoadingEmpId(null);
        }
    };

    useEffect(() => {
        fetchAllSalaries();
    }, []);

    return (
        <div className="admin-salary-container h-full p-4 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <div className="flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Salary</h3>
            </div>

            <div className="w-full h-[68vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table className="min-w-full text-sm border-collapse">
                    <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 dark:text-white">
                        <TableRow>
                            <TableCell isHeader className="p-3 text-left">Salary ID</TableCell>
                            <TableCell isHeader className="p-3 text-left">EmpId</TableCell>
                            <TableCell isHeader className="p-3 text-left">Net Salary</TableCell>
                            <TableCell isHeader className="p-3 text-left">Pay Date</TableCell>
                            <TableCell isHeader className="p-3 text-left">Pay</TableCell>
                            <TableCell isHeader className="p-3 text-left">Status</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allsalary.map((record, idx) => (
                            <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                                <TableCell className="p-3">{record.salaryId}</TableCell>
                                <TableCell className="p-3">{record.employeeId}</TableCell>
                                <TableCell className="p-3">₹{parseFloat(record.netSalary).toFixed(2)}</TableCell>
                                <TableCell className="p-3">
                                    {record.paymentDate ? record.paymentDate.slice(0, 10) : 'N/A'}
                                </TableCell>

                                <TableCell className="p-3">
                                    {record.status === "paid" ? (
                                        <>
                                            {loadingEmpId === record.employeeId ? (
                                                <span className="text-sm text-gray-400 italic">Loading Employee...</span>
                                            ) : selectedEmp?.empId === record.employeeId ? (
                                                <BlobProvider
                                                    document={
                                                        <AdminS
                                                            record={record}
                                                            emp={{
                                                                name: selectedEmp.name || 'N/A',
                                                                designation: selectedEmp.designation || 'N/A',
                                                                department: selectedEmp.department || 'N/A'
                                                            }}
                                                        />
                                                    }
                                                >
                                                    {({ url, loading }) =>
                                                        loading ? (
                                                            <span className="text-sm text-gray-400 italic">Generating PDF...</span>
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
                                                <button
                                                    onClick={() => fetchEmployeeDetails(record.employeeId)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                                >
                                                    Load Slip
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <span className="text-sm text-gray-400 italic">Not Available</span>
                                    )}
                                </TableCell>

                                <TableCell
                                    className={`p-3 font-medium ${record.status === "unpaid" ? "text-red-500" : "text-green-500"}`}
                                >
                                    {record.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
