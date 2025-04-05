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
        tooltip.className = "tooltip bg-secondary rounded-lg shadow-lg border p-2 text-base-100";
        tooltip.style.position = "absolute";
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
            <h1 className="text-2xl text-primary font-bold mb-4">Schedule</h1>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay" // Start with the time grid day view
                events={events}
                // slotLabelClassNames={(time) => {
                //     // Highlight specific time slots
                //     const hour = time.date.getHours();
                //     return hour >= 12 && hour <= 14 ? "bg-yellow-100 text-yellow-800" : "";
                // }}
                dayHeaderClassNames={(date) => {
                    // Highlight Today
                    const day = date.date.getDay();
                    const today = new Date().getDay();
                    return day === today
                        ? "bg-primary text-base-100 font-bold"
                        : "bg-accent text-black";
                }}
                eventMouseEnter={handleEventMouseEnter} // Show tooltip on hover
                eventClassNames={(info) => {
                    // Add a custom class based on the event's properties
                    return info.event.extendedProps.topic === "Important"
                        ? "bg-red-500 text-white"
                        : "bg-blue-500 text-white";
                }}
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