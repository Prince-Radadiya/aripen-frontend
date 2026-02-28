import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";
import Badge from "../../Components/ui/badge/Badge";
import { ArrowUpIcon, GroupIcon } from "lucide-react";
import MonthlyTarget from "../../Components/DataForDashboard/MonthlyTarget";
import { useContext, useEffect, useState } from "react";
import { context } from "../../context/AllData";




export default function EmployeeProjects() {

  const { projectData, setprojectData ,AllTask, setAllTask} = useContext(context)

  const [ProDeta, setProDeta] = useState()
  const [TaskData, setTaskData] = useState([])



  const handelsubmit = async () => {

    const response = await fetch('http://localhost:8000/api/employees/EmployeeProjects.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ })
    });
    let AllProData = await response.json()

    setprojectData(AllProData.projects)
    setAllTask(AllProData.Tasks)

  }


 const handelDetails = (proj) => {
  setProDeta(proj);

  const relatedTasks = AllTask.filter((task) =>
    task.projectId === proj.projectId
  );

  setTaskData(relatedTasks);
};

  useEffect(() => {
    handelsubmit()
  }, [])



  return (
    <div className="main-container-projects grid grid-cols-12 h-full p-4 dark:bg-gray-900 rounded-2xl gap-6">

      {/* Project List Table */}
      <div className="project-list col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[70vh] overflow-hidden dark:text-white">
        <div className="max-h-[30vh] overflow-y-auto">
          <Table className="min-w-full text-sm border-collapse">
            <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableCell isHeader className="p-3 text-left">Project ID</TableCell>
                <TableCell isHeader className="p-3 text-left">Project Name</TableCell>
                <TableCell isHeader className="p-3 text-left">Due Date</TableCell>
                <TableCell isHeader className="p-3 text-left">Action</TableCell>
                <TableCell isHeader className="p-3 text-left">Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((proj, idx) => (
                <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                  <TableCell className="p-3">{proj.projectId}</TableCell>
                  <TableCell className="p-3">{proj.name}</TableCell>
                  <TableCell className="p-3">{ProDeta && ProDeta.deadline?.slice(0, 10)}</TableCell>
                  <TableCell className="p-3">
                    <button
                      onClick={() => handelDetails(proj)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell className={`p-3 font-medium ${proj.status === "In Progress" ? "text-yellow-500" :
                    proj.status === "Pending" ? "text-red-500" : "text-green-500"
                    }`}>
                    {proj.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="projectdetaisl w-full col-span-12 grid grid-cols-12 grid-rows-[auto_1fr] rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] min-h-[75vh] overflow-hidden dark:text-white p-2 gap-3">

        <div className="header col-span-12 p-3 pl-5 text-[1.3vw] ">
          <h1>Project Details</h1>
        </div>

        <div className="cont-details col-span-12 grid grid-cols-12 gap-3 h-[50%]">
          {/* Project Info Cards */}
          <div className="details-project col-span-6 grid grid-cols-12 gap-3">

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] col-span-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ProjectId
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {ProDeta && ProDeta.projectId}
                  </h4>
                </div>
               
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] col-span-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ProjectName
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {ProDeta && ProDeta.name}
                  </h4>
                </div>
              
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] col-span-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Client Id
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {ProDeta && ProDeta.clientId}
                  </h4>
                </div>
               
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] col-span-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
              </div>
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    DueDate
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {ProDeta && ProDeta.deadline?.slice(0, 10)}
                  </h4>
                </div>
               
              </div>
            </div>



          </div>

          {/* Progress Chart */}
          <div className="progress col-span-6">
            <MonthlyTarget
              name="Project Progress"
              des="Project progress until due date"
              par="You completed your project task"
            />
          </div>
        </div>

        {/* Task Table */}
        <div className="project-tasks col-span-12">
          <div className="tasklist col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] max-h-[50vh] overflow-hidden dark:text-white">
            <div className="max-h-[30vh] overflow-y-auto">
              <Table className="min-w-full text-sm border-collapse">
                <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
                  <TableRow>
                    <TableCell isHeader className="p-3 text-left">Task ID</TableCell>
                    <TableCell isHeader className="p-3 text-left">Task Title</TableCell>
                    <TableCell isHeader className="p-3 text-left">Description</TableCell>
                    <TableCell isHeader className="p-3 text-left">Due Date</TableCell>
                    <TableCell isHeader className="p-3 text-left">Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TaskData.map((task, idx) => (
                    <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                      <TableCell className="p-3">{task.taskId}</TableCell>
                      <TableCell className="p-3">{task.title}</TableCell>
                      <TableCell className="p-3">{task.description}</TableCell>
                      <TableCell className="p-3">{task.dueDate?.slice(0, 10)}</TableCell>
                      <TableCell className={`p-3 font-medium ${task.status === "In-Progress" ? "text-yellow-500" :
                        task.status === "pending" ? "text-red-500" : "text-green-500"
                        }`}>
                        {task.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
