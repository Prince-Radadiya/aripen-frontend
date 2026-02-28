import Badge from "../../Components/ui/badge/Badge";
import Label from "../../Components/form/Label";
import Input from "../../Components/form/input/InputField";
import DatePicker from "../../Components/form/date-picker";
import Select from "../../Components/form/Select";
import TextArea from "../../Components/form/input/TextArea";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { context } from "../../context/AllData";
import toast from 'react-hot-toast';
function AddAttandance() {


    const [inputEmpid, setinputEmpid] = useState('')
    const [inputTotalHours, setinputTotalHours] = useState('')
    const [status, setStatus] = useState('')
    const [inputDatePicker, setinputDatePicker] = useState('')
    
    const [employeeList, setemployeeList] = useState([])
    
  const employeeOptions = employeeList.map((id) => ({
        value: id,
        label: id
    }));


    const UpdateAttendance = async () => {
        const response = await fetch('http://localhost:8000/api/Attendance/UpdateAttendance.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                empid: inputEmpid,
                date: inputDatePicker,
                status: status,
                totalHours: inputTotalHours
            })
        });
        let asigntask = await response.json()
        if (asigntask.status === "success") {
            toast.success(`${asigntask.message}`, { position: 'bottom left' });
        } else {
            toast.error(`${asigntask.message}`, { position: 'bottom left' });
        }
       
        
    }

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



    return (
        <>
            <div className="task-assign-form col-span-12 grid grid-cols-12 gap-5 border-gray-200 bg-white p-5 dark:border-gray-800  dark:bg-white/[0.03] rounded-2xl " >
                <div className="heading ml-5 w-[15vw] dark:text-white font-bold ">Update Attendance</div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        UpdateAttendance();
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
                            <Label htmlFor="date">Date</Label>
                            <DatePicker
                                id="date"
                                required
                                placeholder="Select a date"
                                onChange={([date]) => {
                                    const formattedDate = date?.toISOString().split("T")[0]; // "YYYY-MM-DD"
                                    setinputDatePicker(formattedDate);
                                }}
                            />
                        </div>


                        <div className="flex justify-center items-center h-[50%]">
                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                            >
                                Update Attendance
                            </button>
                        </div>
                    </div>

                    <div className="w-[50%] h-full flex flex-col gap-6">
                        <div className="w-full">
                            <Label htmlFor="Status">Status</Label>
                            <Select
                                options={[
                                    { value: "Present", label: "Present" },
                                    { value: "Absent", label: "Absent" },
                                    { value: "HalfDay", label: "Half Day" },
                                ]}
                                onChange={setStatus}
                                required
                                placeholder="Select category"
                            />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="total-hours">total hours</Label>
                            <Input
                                type="text"
                                id="total-hours"
                                required
                                onChange={(e) => setinputTotalHours(e.target.value)}
                                placeholder="HH:MM:SS"
                            />
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AddAttandance
