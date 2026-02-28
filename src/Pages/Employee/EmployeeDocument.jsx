// import EmployeSidebar from "../../Components/EmployeSidebar";

// const EmployeeDocuments = () => {
//     const documents = [
//         { name: "Aadhar.pdf", type: "ID Proof" },
//         { name: "Resume.docx", type: "Resume" }
//     ]; 

//     return (
//         <div className="documents-container w-[100vw] h-[100vh] flex relative overflow-x-hidden">
//             <EmployeSidebar />

//             <div className="main-content w-[74%] h-full bg-gray-100 absolute right-0 flex flex-col items-center px-4">
//                 <h2 className="text-[2vw] font-semibold mt-6 mb-2 flex items-center gap-2">
//                     📁 Uploaded Documents
//                 </h2>

                
//                 <div className="w-[95%] h-[50%] mt-6 bg-white rounded-lg shadow-md overflow-hidden overflow-y-auto0 text-[1.1vw]">
//                     <table className="w-full text-center">
//                         <thead className="bg-gray-200 sticky top-0">
//                             <tr>
//                                 <th className="p-3">Doc Name</th>
//                                 <th className="p-3">Type</th>
//                                 <th className="p-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {documents.map((doc, index) => (
//                                 <tr key={index} className="border-b hover:bg-gray-100">
//                                     <td className="p-3">{doc.name}</td>
//                                     <td className="p-3">{doc.type}</td>
//                                     <td className="p-3 space-x-2">
//                                         <button className="text-blue-600 hover:underline">Download</button>
//                                         <button className="text-green-600 hover:underline">View</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>


//                 <div className="w-[95%] mt-6 text-[1vw]">
//                     <button className="flex items-center gap-2 text-black font-medium hover:text-blue-600">
//                         ⬆️ Upload New Document
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmployeeDocuments;
