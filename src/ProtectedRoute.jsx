import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "./context/AllData";



export default function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);


  useEffect(() => {
    fetch("http://aripen-backend.onrender.com/api/auth/Authcheck.php", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {


        if (data.loggedIn && allowedRoles.includes(data.user.role)) {
          setAuthorized(true)

        } else {
          navigate("/login");
        }
        setLoading(false);

      });

  }, []);

  const { data, setData } = useContext(context)
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

  
  if (loading) return <div>Loading...</div>;
  return authorized ? children : null;
}