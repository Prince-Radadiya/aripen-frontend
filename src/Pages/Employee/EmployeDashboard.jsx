import React, { useContext, useEffect } from 'react'
import CompanyMetrics from '../../Components/DataForDashboard/CompanyMetrics'
import PageMeta from '../../Components/common/PageMeta'
import MonthlyTarget from '../../Components/DataForDashboard/MonthlyTarget'
import StatisticsChart from '../../Components/DataForDashboard/StatisticsChart'
import MonthlyClientsChart from '../../Components/DataForDashboard/MonthlyClientsChart'
import RecentTasks from '../../Components/DataForDashboard/RecentTasks'
import { useFetcher } from 'react-router-dom'
import AllData, { context } from "../../context/AllData";

function EmployeDashboard() {

  const { projectData, setprojectData, AllTask, setAllTask, data, setData } = useContext(context)

  const handelsubmit = async () => {
aripen-backend.onrender.com
// localhost:8000
    const response = await fetch('https://aripen-backend.onrender.com/api/employees/EmployeeProjects.php', {
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

  useEffect(() => {
    fetch('https://aripen-backend.onrender.com/api/employees/EmployeeProfile.php', {
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
    handelsubmit();
  }, []);



  return (
    <>
      <PageMeta
        title="AriPen - EmployeeDashboard"
        description="This is admin dashboard for aripen company employee management"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CompanyMetrics name="Tasks" alltask={AllTask} projectdata={projectData}/>

          < MonthlyClientsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget
            name='Monthly Progress'
            des='  Target you’ve set for each month'
            par=' You earn $3287 today, its higher than last month Keep up your good work'
          />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <RecentTasks />
        </div>


      </div>

    </>
  )
}

export default EmployeDashboard
