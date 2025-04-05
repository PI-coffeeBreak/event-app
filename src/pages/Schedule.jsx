import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext.jsx";

export default function Schedule() {
    const { activities, loading, error } = useContext(ActivityContext);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Map activities to FullCalendar events
    const events = activities.map((activity) => ({
        title: activity.name,
        start: activity.date,
        end: new Date(new Date(activity.date).getTime() + activity.duration * 60000).toISOString(), // Calculate end time based on duration
    }));

    // Calculate the valid range based on activity dates
    const validRange = {
        start: activities.length > 0 ? activities[0].date : null, // Earliest activity date
        end: activities.length > 0 ? activities[activities.length - 1].date : null, // Latest activity date
    };

    const handleDateClick = (info) => {
        alert(`You clicked on date: ${info.dateStr}`);
    };

    return (
        <div className="w-full min-h-svh p-8">
            <h1 className="text-2xl font-bold mb-4">Schedule</h1>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay" // Start with the time grid day view
                events={events}
                validRange={validRange} // Restrict visible days
                dateClick={handleDateClick}
                headerToolbar={{
                    left: "prev,next today", // Navigation buttons
                    center: "title", // Displays the current date
                    right: "", // No additional views
                }}
                slotMinTime="08:00:00" // Start time for the grid
                slotMaxTime="20:00:00" // End time for the grid
                height="auto"
            />
        </div>
    );
}