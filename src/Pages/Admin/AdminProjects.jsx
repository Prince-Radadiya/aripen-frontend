import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";
import Badge from "../../Components/ui/badge/Badge";
import { ArrowUpIcon, GroupIcon } from "lucide-react";
import MonthlyTarget from "../../Components/DataForDashboard/MonthlyTarget";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { context } from "../../context/AllData";
import Label from "../../Components/form/Label";
import Input from "../../Components/form/input/InputField";
import DatePicker from "../../Components/form/date-picker";
import toast from 'react-hot-toast';
import Select from "../../Components/form/Select";


export default function AdminProjects() {

    const { TotalTaskAdmin, settotalTaskAdmin } = useContext(context)
    const [ProDeta, setProDeta] = useState({})
    const [allproject, setallproject] = useState([])
    const [TaskData, setTaskData] = useState([])

    const [clientId, setclientId] = useState('')
    const [Name, setName] = useState('')
    const [description, setdescription] = useState('')
    const [assignedEmployees, setassignedEmployees] = useState('')
    const [status, setstatus] = useState('')
    const [startDate, setstartDate] = useState('')
    const [deadline, setdeadline] = useState('')



    const [employeeList, setemployeeList] = useState([])
    const [clientlist, setclientlist] = useState([])

    const employeeOptions = employeeList.map((id) => ({
        value: id,
        label: id
    }));

    const clientOptions = clientlist ? clientlist.map((id) => ({
        value: id,
        label: id
    })) : [].map((id) => ({
        value: id,
        label: id
    }));

    const handelsubmit = async () => {

        const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminProject.php', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ })
        });
        let totalProjectAdmin = await response.json()
        setallproject(totalProjectAdmin)

    }
    useEffect(() => {
        handelsubmit()
    }, [])

    const handelclick = (proj) => {
        setProDeta(proj)

        const relatedTasks = TotalTaskAdmin.filter((tas) =>
            proj.taskIds.includes(tas.taskId)
        );
        setTaskData(relatedTasks)

    }



    const handeladdproject = async (e) => {
        e.preventDefault()

        const StatusArray = assignedEmployees.split(',').map(p => p.trim()).filter(p => p !== "");

        const projectPayload = {
            clientId,
            Name,
            description,
            assignedEmployees: StatusArray,
            status,
            startDate,
            deadline
        }

        const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminAddProject.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectPayload)
        });
        let projectadd = await response.json()


        if (projectadd.status === 'success') {

            toast.success('project Add');
        } else {

            toast.error('project not Add');
        }


        setclientId(''),
            setName(''),
            setdescription(''),
            setassignedEmployees([]),
            setstatus(''),
            setstartDate(''),
            setdeadline('')

    }

    const handelRemoveProject = async (projectId) => {
        const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminRemoveProject.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ projectId })
        });
        let Projectremove = await response.json()

        if (Projectremove.status === 'success') {

            toast.success('Project Removed');
            handelsubmit();
        } else {

            toast.error('Project not Removed');
        }
    }


    useEffect(() => {

        fetch("http://aripen-backend.onrender.com/api/Others/AdminTaskEmpSelect.php", {
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

        fetch("http://aripen-backend.onrender.com/api/Others/AdminAllClientIds.php", {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
            .then((data) => {
                setclientlist(data.clients);

            });


    }, [])

    return (
        <>
            <div className="main-container-projects grid grid-cols-12 h-full p-4  dark:bg-gray-900 rounded-2xl gap-6">

                <div className="project-list col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[70vh] overflow-hidden dark:text-white">
                    <div className="max-h-full overflow-y-auto">
                        <Table className="min-w-full text-sm border-collapse">
                            <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
                                <TableRow>
                                    <TableCell isHeader className="p-3 text-left">ProjectID</TableCell>
                                    <TableCell isHeader className="p-3 text-left">ProjectName</TableCell>
                                    <TableCell isHeader className="p-3 text-left">Start Date</TableCell>
                                    <TableCell isHeader className="p-3 text-left">Due Date</TableCell>
                                    <TableCell isHeader className="p-3 text-left">View</TableCell>
                                    <TableCell isHeader className="p-3 text-left">Status</TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {allproject.map((proj, idx) => (
                                    <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                                        <TableCell className="p-3">{proj.projectId}</TableCell>
                                        <TableCell className="p-3">{proj.name}</TableCell>
                                        <TableCell className="p-3">{proj.startDate?.slice(0, 10) ?? 'N/A'}</TableCell>
                                        <TableCell className="p-3"> {proj.deadline?.slice(0, 10)}</TableCell>
                                        <TableCell className="p-3">
                                            <button
                                                onClick={() => handelclick(proj)} // Replace with real handler
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                                            >
                                                View
                                            </button>
                                        </TableCell>

                                        <TableCell
                                            className={`p-3 font-medium ${proj.status === "ongoing"
                                                ? "text-yellow-500"
                                                : proj.status === "pending"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                                }`}
                                        >
                                            {proj.status}
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => handelRemoveProject(proj.projectId)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                                Remove Project
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="projectdetaisl w-full col-span-12  grid grid-cols-12 grid-rows-[auto_1fr] rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] min-h-[75vh] overflow-hidden dark:text-white p-2 gap-3">

                    <div className="header col-span-12 p-3 pl-5 text-[1.3vw] "><h1>Project Details</h1></div>

                    <div className="cont-details col-span-12 grid grid-cols-12 gap-3 h-[50%]">

                        <div className="details-project col-span-6 grid grid-cols-12 grid-rows-[auto_1fr] gap-3">

                            <div className="top col-span-12 grid-cols-12 grid gap-3">
                                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 col-span-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                                    </div>

                                    <div className="flex items-end justify-between mt-5">
                                        <div>
                                            <h5 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                                {ProDeta.name}
                                            </h5>

                                        </div>
                                        <Badge color="success">
                                            PrjectName
                                        </Badge>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 col-span-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                                    </div>

                                    <div className="flex items-end justify-between mt-5">
                                        <div>
                                            <span className="text-sm text-gray2-500 dark:text-gray-400">

                                            </span>
                                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                                {ProDeta.projectId}
                                            </h4>
                                        </div>
                                        <Badge color="success">
                                            ProjectID
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="middel col-span-12 grid-cols-12 grid gap-3">
                                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 col-span-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                                    </div>

                                    <div className="flex items-end justify-between mt-5">
                                        <div>
                                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                                {ProDeta.clientId}
                                            </h4>

                                        </div>
                                        <Badge color="success">
                                            ClientID
                                        </Badge>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 col-span-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                                    </div>

                                    <div className="flex items-end justify-between mt-5">
                                        <div>
                                            <span className="text-sm text-gray2-500 dark:text-gray-400">

                                            </span>
                                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                                {ProDeta.status}
                                            </h4>
                                        </div>
                                        <Badge color="success">
                                            Status
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="down col-span-12 grid-cols-12 grid gap-3">
                                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 col-span-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                                    </div>

                                    <div className="flex items-end justify-between mt-5">
                                        <div>
                                            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                                {ProDeta.startDate?.slice(0, 10) ?? 'N/A'}

                                            </h4>

                                        </div>
                                        <Badge color="success">
                                            StartDate
                                        </Badge>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 col-span-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                                    </div>

                                    <div className="flex items-end justify-between mt-5">
                                        <div>
                                            <span className="text-sm text-gray2-500 dark:text-gray-400">

                                            </span>
                                            <h3 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                                                {ProDeta.deadline?.slice(0, 10) ?? ProDeta.dedline?.slice(0, 10) ?? 'N/A'}

                                            </h3>
                                        </div>
                                        <Badge color="success">
                                            DueDate
                                        </Badge>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="progress col-span-6">
                            <MonthlyTarget
                                name='Project Progress'
                                des='Project progress until due date'
                                par=' You Complate your project task' />

                        </div>
                    </div>

                    <div className="project-tasks col-span-12 ">
                        <div className="tasklist col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] max-h-[50vh] overflow-hidden dark:text-white">
                            <div className="max-h-[30vh] overflow-y-auto">
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
                                        {TaskData.map((task, idx) => (
                                            <TableRow key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                                                <TableCell className="p-3">{task.taskId}</TableCell>
                                                <TableCell className="p-3">{task.title}</TableCell>
                                                <TableCell className="p-3">{task.assignedTo}</TableCell>
                                                <TableCell className="p-3">{task.dueDate}</TableCell>
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
                    </div>

                </div>


                <form
                    onSubmit={(e) => {
                        handeladdproject(e)
                    }}
                    className="col-span-12 flex gap-6 items-start w-full max-w-6xl mx-auto flex-wrap mt-6"
                    action=""
                >

                    <div className="w-[48%] flex flex-col gap-6">


                        <div className="w-full">
                            <Label htmlFor="name">Project Name</Label>
                            <Input type="text" id="name" placeholder="Project name" value={Name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="client">Client ID</Label>
                            <Select
                                options={clientOptions}
                                onChange={setclientId}
                                placeholder="Select Client ID"
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" id="description" placeholder="description"
                                value={description} onChange={(e) => setdescription(e.target.value)} />

                        </div>

                    </div>

                    <div className="w-[48%] flex flex-col gap-6">


                        <div className="w-full">
                            <Label htmlFor="phone">AssignedEmployees</Label>
                            <Select
                                options={employeeOptions}
                                onChange={assignedEmployees}
                                placeholder="Select Enployee ID"
                            />
                        </div>


                        <div className="w-full relative z-[999]">
                            <DatePicker
                                id="start Date"
                                label="start Date"
                                placeholder="Select start date"

                                onChange={([date]) => {
                                    const formattedDate = date?.toISOString().split("T")[0];
                                    setstartDate(formattedDate);
                                }}
                            />
                        </div>
                        <div className="w-full relative z-[50]">
                            <DatePicker
                                id="deadline"
                                label="deadline"
                                placeholder="deadline"

                                onChange={([date]) => {
                                    const formattedDates = date?.toISOString().split("T")[0];
                                    setdeadline(formattedDates);
                                }}
                            />
                        </div>


                    </div>

                    <div className="col-span-12 flex justify-center">
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                        >
                            Add Project
                        </button>
                    </div>
                </form>
            </div>




        </>
    )
}