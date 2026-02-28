import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";


export default function AdminExpenses() {

      const [allExpense, setallExpense] = useState([])
     
    
      const handelsubmit = async () => {
    
        const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminExpense.php', {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify({ })
        });
        let totalExpenseAdmin = await response.json()
        setallExpense(totalExpenseAdmin)
    
      }
      useEffect(() => {
        handelsubmit()
      }, [])
    

    return (
        <>
            <div className="expenselist col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[70vh] overflow-hidden dark:text-white mt-6">
                <div className="max-h-full overflow-y-auto">
                    <Table className="min-w-full text-sm border-collapse">
                        <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
                            <TableRow>
                                <TableCell isHeader className="p-3 text-left">Expense ID</TableCell>
                                <TableCell isHeader className="p-3 text-left">Amount</TableCell>
                                <TableCell isHeader className="p-3 text-left">Date</TableCell>
                                <TableCell isHeader className="p-3 text-left">Description</TableCell>
                                <TableCell isHeader className="p-3 text-left">AddedBy</TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {allExpense.map((expense, idx) => (
                                <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                                    <TableCell className="p-3">{expense.expenseId}</TableCell>
                                   
                                    <TableCell className="p-3 text-red-600">₹{expense.amount.toFixed(2)}</TableCell>
                                    <TableCell className="p-3">{expense.date}</TableCell>
                                    <TableCell className="p-3">{expense.category}</TableCell>
                                    <TableCell className="p-3">{expense.addedBy}</TableCell>
                                  
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </>
    )

}