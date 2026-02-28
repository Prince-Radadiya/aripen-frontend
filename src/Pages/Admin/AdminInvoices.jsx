import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";



export default function AdminInvoices() {


  const [allinvoice, setallinvoice] = useState([])


  const handelsubmit = async () => {

    const response = await fetch('http://localhost:8000/api/Admin/Admininvoice.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ })
    });
    let totalInvoiceAdmin = await response.json()
    setallinvoice(totalInvoiceAdmin)

  }
  useEffect(() => {
    handelsubmit()
  }, [])

  return (
    <>
      <div className="invoicelist col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[70vh] overflow-hidden dark:text-white mt-6">
        <div className="max-h-full overflow-y-auto">
          <Table className="min-w-full text-sm border-collapse">
            <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableCell isHeader className="p-3 text-left">Invoice ID</TableCell>
                <TableCell isHeader className="p-3 text-left">Client ID</TableCell>
                <TableCell isHeader className="p-3 text-left">Project ID</TableCell>
                <TableCell isHeader className="p-3 text-left">Amount</TableCell>
                <TableCell isHeader className="p-3 text-left">Due Date</TableCell>
                <TableCell isHeader className="p-3 text-left">Status</TableCell>
                <TableCell isHeader className="p-3 text-left">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allinvoice.map((invoice, idx) => (
                <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                  <TableCell className="p-3">{invoice.invoiceId}</TableCell>
                  <TableCell className="p-3">{invoice.clientId}</TableCell>
                  <TableCell className="p-3">{invoice.projectId}</TableCell>
                  <TableCell className="p-3">₹{invoice.amount.toFixed(2)}</TableCell>
                  <TableCell className="p-3">{invoice.dueDate}</TableCell>
                  <TableCell
                    className={`p-3 font-medium ${invoice.status === "pending"
                        ? "text-yellow-500"
                        : invoice.status === "unpaid"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                  >
                    {invoice.status}
                  </TableCell>
                  <TableCell className="p-3">
                    {invoice.status === "paid" ? (
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md">
                        View
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md"
                      >
                        Pay
                      </button>
                    )}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>


    </>
  )
}