import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { format as formatDate } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams } from "react-router-dom";

const locales = {};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

function AdminCalender() {
    const { empId } = useParams();
    const [events, setEvents] = useState([]);
    const [workData, setWorkData] = useState({});
    const [leaveData, setLeaveData] = useState({});
    

    console.log("Formatted Events:", events);
    useEffect(() => {
        fetch(`http://aripen-backend.onrender.com/api/Attendance/AdminViewAttendance.php?empId=${empId}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                const statusMap = {};
                const leaveMap = {};

                const formatted = data.events.map((event) => {
                    const startDate = new Date(event.start);
                    const endDate = new Date(event.end);

                    const dateKey = formatDate(startDate, "yyyy-MM-dd");
                    statusMap[dateKey] = { status: event.status };

                    return {
                        ...event,
                        start: startDate,
                        end: endDate,
                        status: event.status,
                    };
                });

                // Add leave days to calendar
                data.leave.forEach((leave) => {
                    const leaveKey = formatDate(new Date(leave.leaveDate), "yyyy-MM-dd"); // normalize
                    leaveMap[leaveKey] = leave.status;
                    formatted.push({
                        title: `Leave - ${leave.status}`,
                        start: new Date(leave.leaveDate),
                        end: new Date(leave.leaveDate),
                        status: "Leave",
                        Twork: leave.reason
                    });
                });
               
                

                setEvents(formatted);
                setWorkData(statusMap);
                setLeaveData(leaveMap);
            })

            .catch((err) => console.error(err));
    }, [empId]);


    const dayPropGetter = (date) => {
        const dateStr = formatDate(date, "yyyy-MM-dd");

        // If it's a leave date
        if (leaveData[dateStr]) {
            return { style: { backgroundColor: "#FFD9A0 " } }; // orange
        }

        // Else check workData
        const workInfo = workData[dateStr];
        if (workInfo && workInfo.status) {
            switch (workInfo.status.toLowerCase()) {
                case "present":
                    return { style: { backgroundColor: "#c8f7c5" } }; // green
                case "halfday":
                    return { style: { backgroundColor: "#fff3b0" } }; // yellow
                case "absent":
                    return { style: { backgroundColor: "#f8d7da" } }; // red
                default:
                    return {};
            }
        }
        return {};
    };

    return (
        <div className="admin-attendance-container h-full p-4 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
            <div className="w-full h-[80vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <div style={{ height: "600px", padding: "20px" }}>
                    <h2 className="text-lg font-bold mb-4 dark:text-white">{empId}</h2>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        dayPropGetter={dayPropGetter}
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: "transparent",
                                color: "black",
                                border: "none",
                                paddingLeft: "30px",
                            },
                        })}
                        components={{
                            event: ({ event }) => (
                                <div style={{ fontSize: "0.8rem", lineHeight: "1.2" }}>
                                    {event.status} <br />
                                    {event.totalHours} <br />
                                    {event.Twork} <br />

                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminCalender;
