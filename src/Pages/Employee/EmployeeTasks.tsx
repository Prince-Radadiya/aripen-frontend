import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";


function getStatusStyle(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function EmployeeTasks() {

  const [tasks, setTasks] = useState([]);
  const [TaskDataSend, setTaskDataSend] = useState({
    Id: "",
    Action: ""
  });


  const handleAcceptTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.taskId === id ? { ...task, status: "in-progress" } : task
      )
    )
    setTaskDataSend({
      Id: id,
      Action: "in-progress"
    })

  };

  const handleCompleteTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.taskId === id ? { ...task, status: "completed" } : task
      )
    ),
      setTaskDataSend({
        Id: id,
        Action: "completed"
      })
  };

  const updateTaskStatus = async () => {

    const response = await fetch('http://aripen-backend.onrender.com/api/employees/EmployeeTask.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TaskDataSend)
    });
    let datas = await response.json()

  };



  const handelsubmit = async () => {

    const response = await fetch('http://aripen-backend.onrender.com/api/employees/EmployeeProjects.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({})
    });
    let AllProData = await response.json()

    setTasks(AllProData.Tasks);
  }

  useEffect(() => {
    handelsubmit()
  }, []);

  useEffect(() => {
    updateTaskStatus()
  }, [TaskDataSend])


  return (
    <div className="employee-task-container h-full p-4 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">My Tasks</h3>

      <div className="w-full h-[68vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 dark:text-white">
        <Table className="min-w-full text-[15px] border-collapse">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableCell isHeader className="p-3 text-left">Task ID</TableCell>
              <TableCell isHeader className="p-3 text-left">Task Title</TableCell>
              <TableCell isHeader className="p-3 text-left">Description</TableCell>
              <TableCell isHeader className="p-3 text-left">Due Date</TableCell>
              <TableCell isHeader className="p-3 text-left">Action</TableCell>
              <TableCell isHeader className="p-3 text-left">Status</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tasks.map((task, idx) => (
              <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                <TableCell className="p-3">{task.taskId}</TableCell>
                <TableCell className="p-3 font-medium text-gray-800 dark:text-white">{task.title}</TableCell>
                <TableCell className="p-3 text-sm">{task.description}</TableCell>
                <TableCell className="p-3">{task.dueDate}</TableCell>
                <TableCell className="p-3">
                  {task.status === "pending" && (
                    <button
                      onClick={() => handleAcceptTask(task.taskId)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Accept Task
                    </button>
                  )}
                  {task.status === "in-progress" && (
                    <button
                      onClick={() => handleCompleteTask(task.taskId)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      Completed
                    </button>
                  )}
                </TableCell>
                <TableCell className="p-3">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyle(task.status)}`}>
                    {task.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
