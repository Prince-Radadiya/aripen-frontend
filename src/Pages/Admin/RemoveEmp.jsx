import React, { useState } from 'react'
import Label from '../../Components/form/Label';
import Input from '../../Components/form/input/InputField';
import toast from 'react-hot-toast';

function RemoveEmp() {

    const [empId, setEmpId] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        const empPayload = {
            empId,

        }

        const response = await fetch('https://aripen-backend.onrender.com/api/Admin/AdminRemoveEmp.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empPayload)
        });
        let Empromove = await response.json()

        if (Empromove.status === 'success') {

            toast.success('Employee removed');
        } else {

            toast.error('Employee not removed');
        }

        setEmpId('');
        setName('');

    }
    return (
        <div>
            <div className="task-assign-form col-span-12 grid grid-cols-12 gap-5 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl ">
                <div className="heading ml-5 w-[15vw] dark:text-white font-bold col-span-12">Remove Employee</div>
                <form
                    onSubmit={(e) => {
                        handelSubmit(e)
                    }}
                    className="col-span-12 flex gap-6 justify-center  items-end w-full max-w-6xl mx-auto flex-wrap"
                    action=""
                >

                    <div className="w-[48%]  col-span-6">
                        <div className="w-full ">
                            <Label htmlFor="empid">Employee ID</Label>
                            <Input type="text" required id="empid" placeholder="EMP001" value={empId} onChange={(e) => setEmpId(e.target.value.toUpperCase())} />
                        </div>
                    </div>



                    <div className="col-span-6 flex justify-center items-center relative w-[40%]">
                        <button

                            type="submit"
                            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 w-48 "
                        >
                            Remove Employee
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default RemoveEmp
