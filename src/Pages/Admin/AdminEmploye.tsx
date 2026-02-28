import PageMeta from "../../Components/common/PageMeta";

import DatePicker from "../../Components/form/date-picker";
import Input from "../../Components/form/input/InputField";
import TextArea from "../../Components/form/input/TextArea";
import Label from "../../Components/form/Label";
import { context } from "../../context/AllData";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Select from "../../Components/form/Select";



export default function AdminEmployee() {
  const { adminallEmp, setadminallEmp } = useContext(context)
  const [showPassword, setShowPassword] = useState(false);

  const [employeeList, setemployeeList] = useState([])
  const [projectlist, setprojectlist] = useState([])


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [emergency, setEmergency] = useState('');
  const [role, setRole] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [reportingManager, setReportingManager] = useState('');
  const [projects, setProjects] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [errors, setErrors] = useState({});

  const employeeOptions = employeeList.map((id) => ({
    value: id,
    label: id
  }));

  const projectOptions = projectlist ? projectlist.map((id) => ({
    value: id,
    label: id
  })) : [].map((id) => ({
    value: id,
    label: id
  }));

  const getTotalEmployee = async () => {

    const response = await fetch('http://localhost:8000/api/Admin/AdminTotalEmployee.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let totalemployees = await response.json()
    setadminallEmp(totalemployees)

  }
  useEffect(() => {
    getTotalEmployee()
    const interval = setInterval(() => {
      getTotalEmployee()
    }, 20000);

    return () => clearInterval(interval);
  }, [])


  const handelSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const projectArray = projects.split(',').map(p => p.trim()).filter(p => p !== "");

    // ✅ Use FormData to handle both text and file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('emergency', emergency);
    formData.append('role', role);
    formData.append('designation', designation);
    formData.append('department', department);
    formData.append('address', address);
    formData.append('joinDate', joinDate);
    formData.append('reportingManager', reportingManager);
    formData.append('projects', JSON.stringify(projectArray));

    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    const response = await fetch('http://localhost:8000/api/Admin/AdminAddEmployee.php', {
      method: 'POST',
      credentials: "include",
      body: formData
    });

    let Empadd = await response.json();

    if (Empadd.status === 'success') {
      toast.success('Employee Added Successfully');
      getTotalEmployee();
    } else {
      toast.error('Employee Not Added');
    }

    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setEmergency('');
    setRole('');
    setDesignation('');
    setDepartment('');
    setAddress('');
    setJoinDate('');
    setReportingManager('');
    setProjects('');
    setProfilePhoto('');
  };

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

    fetch("http://localhost:8000/api/Others/AdminAllProjectids.php", {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json())
      .then((data) => {
        setprojectlist(data.projects);


      });


  }, [])



  return (

    <div className="admin-employee-container h-full p-4 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 z-40  flex flex-col gap-[1.5vw] ">

      <div className="flex flex-col  mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Employees
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>



      <div className="w-full overflow-y-auto h-[70vh] border rounded-2xl border-gray-200 dark:border-gray-800 dark:bg-gray-900 ">
        <div className="min-w-[900px] max-h-[68vh] overflow-auto relative">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <tr>
                {["Emp ID", "Photo", "Name", "Designation", "Department", "JoinDate"].map((heading, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {adminallEmp.map((item, idx) => (
                <tr key={idx} className="even:bg-gray-50 dark:even:bg-white/[0.02]">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.empId}</td>
                  <td className="py-3 px-4">
                    <img
                      src={item.profilePhoto}
                      alt="Employee"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.name}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.designation}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.department}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {item.joinDate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="task-assign-form col-span-12 grid grid-cols-12 gap-5 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl">
        <div className="heading ml-5 w-[8vw] dark:text-white font-bold">Add Employee</div>
        <form
          onSubmit={(e) => {
            handelSubmit(e)
          }}
          className="col-span-12 flex gap-6 items-start w-full max-w-6xl mx-auto flex-wrap"
          action=""
        >

          <div className="w-[48%] flex flex-col gap-6">


            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input type="text" required id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="w-full">
              <Label htmlFor="email">Email ID</Label>
              <Input type="email" required id="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="w-full relative">
              <Label htmlFor="password">Password</Label>
              <Input type={showPassword ? "text" : "password"} required id="password" placeholder="********" className={errors.password ? "border-red-500" : ""}
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4  top-[70%]"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="w-full">
              <Label htmlFor="phone">Phone</Label>
              <Input type="text" required id="phone" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="w-full">
              <Label htmlFor="emergency">Emergency Contact</Label>
              <Input type="text" id="emergency" placeholder="9876543211" value={emergency} onChange={(e) => setEmergency(e.target.value)} />
            </div>

            <div className="w-full">
              <Label htmlFor="role">Role</Label>
               <Select
                options={[{ value: 'Admin', label: 'Admin' }, { value: 'Employee', label: 'Employee' }]}
                onChange={setRole}
                placeholder="Select Role"
              />
            </div>
               

          </div>

          <div className="w-[48%] flex flex-col gap-6">

            <div className="w-full">
              <Label htmlFor="designation">Designation</Label>
              <Input type="text" required id="designation" placeholder="Software Engineer" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            </div>

            <div className="w-full">
              <Label htmlFor="department">Department</Label>
              <Input type="text" required id="department" placeholder="IT / HR / Design" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>

            <div className="w-full">
              <Label htmlFor="address">Address</Label>
              <Input id="address" required placeholder="City,Country" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="w-full relative z-[50]">
              <DatePicker
                id="join-date"
                label="Join Date"
                placeholder="Select joining date"
                required
                onChange={([date]) => {
                  const formattedDate = date?.toISOString().split("T")[0];
                  setJoinDate(formattedDate);
                }}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="reporting">Reporting Manager</Label>
              <Select
                options={employeeOptions}
                onChange={reportingManager}
                placeholder="Select Enployee ID"
              />
            </div>

            <div className="w-full">
              <Label htmlFor="projects">Project IDs</Label>
              <Select
                options={projectOptions}
                onChange={setProjects}
                placeholder="Select project ID"
              />
            </div>

            <div className="w-full">
              <Label htmlFor="photo">Profile Photo URL</Label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div className="col-span-12 flex justify-center relative left-1/6">
            <button

              type="submit"
              className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Add Employee
            </button>
          </div>
        </form>

      </div>



    </div>

  );
}
