import PageBreadcrumb from "../../Components/common/PageBreadCrumb";
import UserMetaCard from "../../Components/UserProfile/UserMetaCard";
import UserInfoCard from "../../Components/UserProfile/UserInfoCard";
import UserAddressCard from "../../Components/UserProfile/UserAddressCard";
import PageMeta from "../../Components/common/PageMeta";
import { context } from "../../context/AllData";
import { useContext, useEffect } from "react";

export default function EmployeProfile() {
       const { data, setData } = useContext(context)
    
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
          if (data && data.UserData) {F
            setData(data.UserData);
          } else {
            console.log("No UserData found in response:", data);
          }
        })
        .catch((error) => {
          console.error("Login request failed:", error);
        });
    }, []);
  return (
    <>
      <PageMeta
        title="Profile  "
        description=""
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </>
  );
}
