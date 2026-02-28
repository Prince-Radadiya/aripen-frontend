import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, formatDate } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});




const YearlyCalendar = () => {

    const { empId } = useParams();
    const [events, setEvents] = useState([]);
    const [workData, setWorkData] = useState({});
    const [leaveData, setLeaveData] = useState({});


    useEffect(() => {
        fetch(`http://localhost:8000/api/Attendance/AdminViewAttendance.php?empId=${empId}`, {
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



    const year = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

    return (
        <div className="grid grid-cols-3 gap-4">
            {months.map((monthDate, idx) => (
                <div key={idx} className="border rounded p-2">
                    <h3 className="text-center font-bold">
                        {monthDate.toLocaleString("default", { month: "long" })}
                    </h3>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        defaultView="month"
                        views={["month"]}
                        date={monthDate}
                        style={{ height: 300 }}
                        dayPropGetter={dayPropGetter}
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: "transparent",
                                color: "black",
                                border: "none",
                                paddingLeft: "",
                            },
                        })}
                        components={{
                            event: ({ event }) => (
                                <div style={{ fontSize: "0.5rem", lineHeight: "1.2" }}>
                                    {event.status} <br />
                                    {event.totalHours} <br />
                                    {event.Twork} <br />

                                </div>
                            )
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default YearlyCalendar;
