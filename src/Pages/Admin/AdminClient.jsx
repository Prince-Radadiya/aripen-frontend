import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../Components/ui/table";
import Label from "../../Components/form/Label";
import Input from "../../Components/form/input/InputField";
import DatePicker from "../../Components/form/date-picker";
import toast from 'react-hot-toast';
import Select from "../../Components/form/Select";


export default function AdminClient() {
  const [allClient, setallClient] = useState([])

  const [Name, setName] = useState('')
  const [email, setemail] = useState('')
  const [contact, setcontact] = useState('')
  const [address, setaddress] = useState('')
  const [createdAt, setcreatedAt] = useState('')
  const [status, setstatus] = useState('')
  const [projects, setprojects] = useState('')


  const [projectlist, setprojectlist] = useState([])

  const projectOptions = projectlist ? projectlist.map((id) => ({
    value: id,
    label: id
  })) : [].map((id) => ({
    value: id,
    label: id
  }));


  const handelsubmit = async () => {

    const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminClient.php', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ })
    });
    let totalClientsAdmin = await response.json()
    setallClient(totalClientsAdmin)

  }
  useEffect(() => {
    handelsubmit()
  }, [])

  const StatusArray = projects.split(',').map(p => p.trim()).filter(p => p !== "").map(p => ({ projectId: p }));



  const clientPayload = {
    Name,
    email,
    contact,
    address,
    createdAt,
    status,
    projects: StatusArray,
  }

  const handeladdClient = async (e) => {
    e.preventDefault()

    const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminAddClient.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientPayload)
    });
    let Clientadd = await response.json()

    if (Clientadd.status === 'success') {

      toast.success('Client Add');
    } else {

      toast.error('Client not Add');
    }

    setName(''),
      setemail(''),
      setcontact(''),
      setaddress(''),
      setcreatedAt(''),
      setstatus(''),
      setprojects('')
  }

  const handelRemoveClient = async (clientId) => {
    const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminRemoveClient.php', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ clientId })
    });
    let Clientremove = await response.json()

    if (Clientremove.status === 'success') {

      toast.success('Client Removed');
      handelsubmit();
    } else {

      toast.error('Client not Removed');
    }
  }


  useEffect(() => {

    fetch("http://aripen-backend.onrender.com/api/Others/AdminAllProjectids.php", {
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
    <>
      <div className="clientlist col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[70vh] overflow-hidden dark:text-white">
        <div className="max-h-full overflow-y-auto">
          <Table className="min-w-full text-sm border-collapse">
            <TableHeader className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableCell isHeader className="p-3 text-left">Client ID</TableCell>
                <TableCell isHeader className="p-3 text-left">Client Name</TableCell>
                <TableCell isHeader className="p-3 text-left">Project ID</TableCell>
                <TableCell isHeader className="p-3 text-left">createdAt</TableCell>
                <TableCell isHeader className="p-3 text-left">Status</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allClient.map((client, idx) =>
                client.projects?.map((project, pidx) => (
                  <TableRow key={`${idx}-${pidx}`} className="even:bg-gray-50 dark:even:bg-white/[0.02] dark:text-gray-300">
                    <TableCell className="p-3">{client.clientId}</TableCell>
                    <TableCell className="p-3">{client.name}</TableCell>
                    <TableCell className="p-3">{project.projectId}</TableCell>
                    <TableCell className="p-3">{client.createdAt?.slice(0, 10)}</TableCell>
                    <TableCell
                      className={`p-3 font-medium ${client.status === "Active"
                        ? "text-yellow-500"
                        : client.status === "Pending"
                          ? "text-red-500"
                          : "text-green-500"
                        }`}
                    >
                      {client.status}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handelRemoveClient(client.clientId)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Remove Client
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}

            </TableBody>
          </Table>
        </div>




      </div>

      <h1 className="mt-8 text-[1.5vw] dark:text-white">Add Client</h1>

      <form
        onSubmit={(e) => {
          handeladdClient(e)
        }}
        className="col-span-12 flex gap-6 items-start w-full mt-4  p-2 flex-wrap rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] h-[70vh] overflow-hidden dark:text-white"
        action=""
      >
        <div className="w-[48%] flex flex-col gap-6">


          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="John Doe" value={Name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="w-full">
            <Label htmlFor="client">email </Label>
            <Input type="email" id="email" placeholder="client1@acme.com" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>

          <div className="w-full">
            <Label htmlFor="description">Contact</Label>
            <Input type="text" id="Contact" placeholder="991183955"
              value={contact} onChange={(e) => setcontact(e.target.value)} />

          </div>

        </div>

        <div className="w-[48%] flex flex-col gap-6">


          <div className="w-full">
            <Label htmlFor="phone">Address</Label>
            <Input type="text" id="address" placeholder="address" value={address} onChange={(e) => setaddress(e.target.value)} />
          </div>


          <div className="w-full">
            <Label htmlFor="emergency">Projects </Label>
            <Select
              options={projectOptions}
              onChange={setprojects}
              placeholder="Select project ID"
            />
          </div>

          <div className="w-full relative z-[50]">
            <DatePicker
              id="createdAt"
              label="createdAt "
              placeholder="setcreatedAt"
              value={createdAt}
              onChange={([date]) => {
                const formattedDate = date?.toISOString().split("T")[0];
                setcreatedAt(formattedDate);
              }}
            />
          </div>


        </div>

        <div className="col-span-12 flex justify-center">
          <button
            type="submit"
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Add Client
          </button>
        </div>
      </form>


    </>
  )
}

