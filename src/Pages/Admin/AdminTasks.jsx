import {
    ArrowDownIcon,
    ArrowUpIcon,
    BoxIconLine,
    GroupIcon,
    TaskIcon
} from "../../icons";
import Badge from "../../Components/ui/badge/Badge";
import Label from "../../Components/form/Label";
import Input from "../../Components/form/input/InputField";
import DatePicker from "../../Components/form/date-picker";
import Select from "../../Components/form/Select";
import TextArea from "../../Components/form/input/TextArea";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";
import { use, useEffect, useState } from "react";
import { useContext } from "react";
import { context } from "../../context/AllData";
import toast from 'react-hot-toast';
import { set } from "date-fns";



export default function AdminTasks() {

    const { TotalTaskAdmin, settotalTaskAdmin } = useContext(context)
    const [complateTask, setcomplateTask] = useState()
    const [pendingTask, setpendingTask] = useState([])
    const [inprogressTask, setinprogressTask] = useState()

    const [employeeList, setemployeeList] = useState([])
    const [projectlist, setprojectlist] = useState([])


    const [inputEmpid, setinputEmpid] = useState("")
    const [inputTaskTitle, setinputTaskTitle] = useState('')
    const [inputcategory, setinputcategory] = useState('')
    const [inputProjectId, setinputProjectId] = useState('')
    const [inputDatePicker, setinputDatePicker] = useState('')
    const [inputDescription, setinputDescription] = useState("")


    const employeeOptions = employeeList.map((id) => ({
        value: id,
        label: id
    }));

    const projectOptions =  projectlist ? projectlist.map((id) => ({
        value: id,
        label: id
    })) : [].map((id) => ({
        value: id,
        label: id
    }));

    const handelsubmit = async () => {

        const response = await fetch('http://localhost:8000/api/Admin/AdminTask.php', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ })
        });
        let totalTaskAdmin = await response.json()
        settotalTaskAdmin(totalTaskAdmin)


    }

    useEffect(() => {
        handelsubmit()
    }, [])

    const handelAsingn = async () => {
        const response = await fetch('http://localhost:8000/api/Admin/AdminAsingnTask.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assignedTo: inputEmpid,
                title: inputTaskTitle,
                category: inputcategory,
                projectId: inputProjectId,
                dueDate: inputDatePicker,
                description: inputDescription
            })
        });
        let asigntask = await response.json()

        if (asigntask.status === 'success') {

            toast.success('Task Add');
        } else {

            toast.error('Task not Add');
        }



        // After successful fetch
        setinputEmpid('');
        setinputTaskTitle('');
        setinputcategory('');
        setinputProjectId('');
        setinputDatePicker('');
        setinputDescription('');


    }

    useEffect(() => {

        if (TotalTaskAdmin) {
            const pending = TotalTaskAdmin.filter((task) =>
                task.status === 'pending'
            );
            setpendingTask(pending);

            const inpogress = TotalTaskAdmin.filter((task) =>
                task.status === 'in-progress'
            );
            setinprogressTask(inpogress);

            const completed = TotalTaskAdmin.filter((task) =>
                task.status === 'completed'
            );
            setcomplateTask(completed);
        }
    }, [TotalTaskAdmin])


    useEffect(() => {

        fetch("http://localhost:8000/api/Others/AdminTaskEmpSelect.php", {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
            .then((data) => {
                setemployeeList(data.employees);


            });


    }, [])

    useEffect(() => {

        fetch("http://localhost:8000/api/Others/AdminProjectSelect.php", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({inputEmpid})
        }).then((res) => res.json())
            .then((data) => {
                setprojectlist(data.projects);
                
                
            });
            
            
        }, [inputEmpid])
      

    return (
        <>
            <div className="task-container grid grid-col-12 gap-10 ">
                <div className="metrics col-span-12">

                    <div className="grid grid-cols-12 gap-4 sm:grid-cols-12 md:gap-6">


                        <div className="rounded-2xl border col-span-3 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6" >
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                <TaskIcon className="text-gray-800 size-6 dark:text-white/90" />
                            </div>

                            <div className="flex items-end justify-between mt-5">
                                <div>
                                    <span className="text-sm text-green-500 dark:text-green-400">
                                        Completed
                                    </span>
                                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                        {(complateTask?.length || 0)}

                                    </h4>
                                </div>

                            </div>
                        </div>
                        <div className="rounded-2xl border col-span-3 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6" >
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                <TaskIcon className="text-gray-800 size-6 dark:text-white/90" />
                            </div>

                            <div className="flex items-end justify-between mt-5">
                                <div>
                                    <span className="text-sm text-red-500 dark:text-red-400">
                                        Pending
                                    </span>
                                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                        {(pendingTask?.length || 0)}

                                    </h4>
                                </div>

                            </div>
                        </div>
                        <div className="rounded-2xl border col-span-3 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6" >
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                <TaskIcon className="text-gray-800 size-6 dark:text-white/90" />
                            </div>

                            <div className="flex items-end justify-between mt-5">
                                <div>
                                    <span className="text-sm text-yellow-500 dark:text-yellow-400">
                                        Inprogress
                                    </span>
                                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                        {(inprogressTask?.length || 0)}

                                    </h4>
                                </div>

                            </div>
                        </div>
                        <div className="rounded-2xl border col-span-3 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6" >
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                <TaskIcon className="text-gray-800 size-6 dark:text-white/90" />
                            </div>

                            <div className="flex items-end justify-between mt-5">
                                <div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Total
                                    </span>
                                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                        {(TotalTaskAdmin?.length || 0)}

                                    </h4>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>

                <div className="task-assign-form col-span-12 grid grid-cols-12 gap-5 border-gray-200 bg-white p-5 dark:border-gray-800  dark:bg-white/[0.03] rounded-2xl " >
                    <div className="heading ml-5 w-[8vw] dark:text-white font-bold ">Assign Task</div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handelAsingn();
                        }}
                        className="col-span-12 flex  gap-6 items-center w-full max-w-4xl mx-auto"
                        action=""
                    >
                        <div className="w-[50%] h-full flex flex-col gap-6">
                            <div className="w-full">
                                <Label htmlFor="ast">Employee ID</Label>
                                <Select
                                    options={employeeOptions}
                                    onChange={setinputEmpid}
                                    placeholder="Select Enployee ID"
                                />
                            </div>

                            <div className="w-full">
                                <Label htmlFor="task">Task Title</Label>
                                <Input
                                    onChange={(e) => setinputTaskTitle(e.target.value)}
                                    type="text" id="task" placeholder="Design Dashboard" />
                            </div>

                            <div className="w-full">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    options={[
                                        { value: "UI/UX", label: "UI/UX" },
                                        { value: "Backend", label: "Backend" },
                                        { value: "FrontEnd", label: "FrontEnd" },
                                    ]}
                                    onChange={setinputcategory}
                                    placeholder="Select category"
                                />
                            </div>
                            <div className="flex justify-center items-center h-[50%]">
                                <button
                                    type="submit"
                                    className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                >
                                    Assign Task
                                </button>
                            </div>
                        </div>

                        <div className="w-[50%] h-full flex flex-col gap-6">
                            <div className="w-full">
                                <Label htmlFor="assigned">Project Id</Label>
                                <Select
                                    options={projectOptions}
                                    onChange={setinputProjectId}
                                    placeholder="Select project ID"
                                />
                            </div>

                            <div className="w-full">
                                <DatePicker
                                    id="due-date"
                                    label="Due Date"
                                    placeholder="Select a date"
                                    onChange={([date]) => {
                                        const formattedDate = date?.toISOString().split("T")[0]; // "YYYY-MM-DD"
                                        setinputDatePicker(formattedDate);
                                    }}
                                />
                            </div>

                            <div className="w-full">
                                <Label>Description</Label>
                                <TextArea
                                    value={inputDescription}
                                    onChange={setinputDescription}
                                    rows={6}
                                />
                            </div>


                        </div>

                    </form>
                </div>

                <div className="tasklist col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] max-h-[50vh] overflow-hidden dark:text-white">
                    <div className="max-h-[50vh] overflow-y-auto">
                        <Table className="min-w-full text-sm border-collapse">
                            <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
                                <TableRow>
                                    <TableCell isHeader className="p-3 text-left">Task ID</TableCell>
                                    <TableCell isHeader className="p-3 text-left">Title</TableCell>
                                    <TableCell isHeader className="p-3 text-left">Assigned To</TableCell>
                                    <TableCell isHeader className="p-3 text-left">Due Date</TableCell>
                                    <TableCell isHeader className="p-3 text-left">Status</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {TotalTaskAdmin.map((task, idx) => (
                                    <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                                        <TableCell className="p-3">{task.taskId}</TableCell>
                                        <TableCell className="p-3">{task.title}</TableCell>
                                        <TableCell className="p-3">{task.assignedTo}</TableCell>
                                        <TableCell className="p-3">{task.dueDate?.slice(0, 10)}</TableCell>
                                        <TableCell
                                            className={`p-3 font-medium ${task.status === "in-progress"
                                                ? "text-yellow-500"
                                                : task.status === "pending"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                                }`}
                                        >
                                            {task.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>




            </div >
        </>
    )
}