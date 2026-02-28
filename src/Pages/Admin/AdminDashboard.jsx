import CompanyMetrics from "../../Components/DataForDashboard/CompanyMetrics";
import MonthlyClientsChart from "../../Components/DataForDashboard/MonthlyClientsChart";
import StatisticsChart from "../../Components/DataForDashboard/StatisticsChart";
import MonthlyTarget from "../../Components/DataForDashboard/MonthlyTarget";
import RecentTasks from "../../Components/DataForDashboard/RecentTasks";
import DemographicCard from "../../Components/DataForDashboard/DemographicCard";
import PageMeta from "../../Components/common/PageMeta";
import { context } from "../../context/AllData";
import { useContext, useEffect, useState } from "react";

export default function AdminDashboard() {
  // aa temparray chhe pachhi kadhi nakhvu
  const { projectData, AllTask, adminallEmp, TotalTaskAdmin, settotalTaskAdmin, data, setData } = useContext(context)
  const [allClient, setallClient] = useState([])
  const [allproject, setallproject] = useState([])

  const handeladminTask = async () => {

    const response = await fetch('http://aripen-backend.onrender.com/api/Admin/AdminTask.php', {
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
    handeladminTask()
  }, [])



  const handeladminClient = async () => {

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
    handeladminClient()
  }, [])


  const handeladminproject = async () => {

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
    handeladminproject()
  }, [])


  useEffect(() => {
    fetch('http://aripen-backend.onrender.com/api/employees/EmployeeProfile.php', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },

    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.UserData) {
          setData(data.UserData);
        } else {
          console.log("No UserData found in response:", data);
        }
      })
      .catch((error) => {
        console.error("Login request failed:", error);
      });
    // handelsubmit();
  }, []);

  return (
    <>
      <PageMeta
        title="AriPen - AdminDahsboard"
        description="This is admin dashboard for aripen company employee management"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CompanyMetrics name="clients" alltask={allClient} projectdata={allproject} />

          < MonthlyClientsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget
            name='Monthly Progress'
            des='  Target you’ve set for each month'
            par=' You earn $3287 today, its higher than last month Keep up your good work'
          />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          {/* <RecentTasks /> */}
        </div>
      </div>

    </>
  );
}
