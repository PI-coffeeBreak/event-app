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
        extendedProps: {
            description: activity.description,
            speaker: activity.speaker,
            topic: activity.topic,
        },
    }));

    const handleEventMouseEnter = (info) => {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.style.position = "absolute";
        tooltip.style.background = "#fff";
        tooltip.style.border = "1px solid #ccc";
        tooltip.style.padding = "10px";
        tooltip.style.zIndex = "1000";
        tooltip.innerHTML = `
            <strong>${info.event.title}</strong><br />
            <em>${info.event.extendedProps.topic}</em><br />
            Speaker: ${info.event.extendedProps.speaker}<br />
            ${info.event.extendedProps.description}
        `;
        document.body.appendChild(tooltip);

        const moveTooltip = (e) => {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        };

        document.addEventListener("mousemove", moveTooltip);

        info.el.addEventListener("mouseleave", () => {
            tooltip.remove();
            document.removeEventListener("mousemove", moveTooltip);
        });
    };

    // Calculate the valid range based on activity dates
    const validRange = {
        start: activities.length > 0 ? activities[0].date : null, // Earliest activity date
        end: activities.length > 0 ? activities[activities.length - 1].date : null, // Latest activity date
    };

    return (
        <div className="w-full min-h-svh p-8">
            <h1 className="text-2xl font-bold mb-4">Schedule</h1>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay" // Start with the time grid day view
                events={events}
                eventMouseEnter={handleEventMouseEnter} // Show tooltip on hover
                validRange={validRange} // Restrict visible days
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