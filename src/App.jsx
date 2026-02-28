
import Login from './Pages/Auth/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminLayout from "./Layouts/AdminLayout"
import AdminSalary from './Pages/Admin/AdminSalary'
import AdminAttendance from './Pages/Admin/AdminAttendance'
import AdminEmploye from './Pages/Admin/AdminEmploye'
import AdminTasks from './Pages/Admin/AdminTasks'
import AdminClient from './Pages/Admin/AdminClient'
import AdminProjects from './Pages/Admin/AdminProjects'
import AdminExpenses from './Pages/Admin/AdminExpenses'
import AdminInvoices from './Pages/Admin/AdminInvoices'

import EmployeeLayout from "./Layouts/EmployeeLayout"
import EmployeDashboard from './Pages/Employee/EmployeDashboard'
import EmployeProfile from './Pages/Employee/EmployeProfile'
import EmployeeAttendance from './Pages/Employee/EmployeeAttendance'
import EmployeeTasks from './Pages/Employee/EmployeeTasks'
import EmployeeSalary from './Pages/Employee/EmployeeSalary'
import EmployeeProjects from './Pages/Employee/EmployeeProjects'
import EmployeeLeave from './Pages/Employee/EmployeeLeave'
import AllData from './context/AllData'
import ProtectedRoute from './ProtectedRoute'
import AdminLeave from './Pages/Admin/AdminLeave'
import EmpSalarySlip from './Pages/Employee/EmpSalarySlip'
import AdminSalarySlips from './Pages/Admin/AdminSalarySlips'
import { Toaster } from 'react-hot-toast'
import EmpS from './Pages/Employee/EmpS'
import AdminCalender from './Pages/Admin/AdminCalender'
import AdminYearCalander from './Pages/Admin/AdminYearCalander'
import UpdateAttandance from './Pages/Admin/UpdateAttandance'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import ResatPassword from './Pages/Auth/ResatPassword'
import ResetPassword from './Pages/Auth/ResatPassword'
import RemoveEmp from './Pages/Admin/RemoveEmp'

const App = () => {
  return (
    <>
      <AllData>
        <Router>
          <Routes>

            <Route path="/admin" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
              <Route path="employees" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminEmploye /></ProtectedRoute>} />
              <Route path="employees/attendance" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminAttendance /></ProtectedRoute>} />
              <Route path="employees/task" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminTasks /></ProtectedRoute>} />
              <Route path="employees/salary" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminSalary /></ProtectedRoute>} />
              <Route path="employees/Leave" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminLeave /></ProtectedRoute>} />
              <Route path="employees/AddAttendance" element={<ProtectedRoute allowedRoles={["Admin"]}><UpdateAttandance /></ProtectedRoute>} />
               <Route path="employees/RemoveEmployees" element={<ProtectedRoute allowedRoles={["Admin"]}><RemoveEmp /></ProtectedRoute>} />
              {/* <Route path="employees/YearCalander" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminYearCalander /></ProtectedRoute>} /> */}
              <Route path="projects" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminProjects /></ProtectedRoute>} />
              <Route path="clients" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminClient /></ProtectedRoute>} />
              <Route path="expense" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminExpenses /></ProtectedRoute>} />
              <Route path="invoices" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminInvoices /></ProtectedRoute>} />
              
              <Route path="salaryslips" allowedRoles={["Admin"]} element={<AdminSalarySlips />} />
              <Route
                path="calendar/:empId"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <AdminCalender />
                  </ProtectedRoute>
                }
              />
               <Route
                path="YearCalander/:empId"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <AdminYearCalander />
                  </ProtectedRoute>
                }
              />
            </Route>
             
         

            <Route path='/login' element={<Login />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword/>} />

            <Route path="/" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeeLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeDashboard /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeProfile /></ProtectedRoute>} />
              <Route path="attendance" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeeAttendance /></ProtectedRoute>} />
              <Route path="task" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeeTasks /></ProtectedRoute>} />
              <Route path="salary" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeeSalary /></ProtectedRoute>} />
              <Route path="project" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeeProjects /></ProtectedRoute>} />
              <Route path="LeaveRequest" element={<ProtectedRoute allowedRoles={["Employee"]}><EmployeeLeave /></ProtectedRoute>} />
              <Route path="salaryslip" allowedRoles={["Employee"]} element={<EmpS />} />
              {/* <Route path="invoices" allowedRoles={["Admin"]} element={<AdminInvoices />} /> */}
            </Route>

          </Routes>
        </Router>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              // background: '#3B82F6', 

              zIndex: 99999,
            },
          }}
        />

      </AllData>
    </>
  )
}

export default App
