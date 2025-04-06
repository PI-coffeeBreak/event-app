import axios from "axios";
import { useState } from "react";

export default function Button({
    text = "Default Button",
    METHOD = "GET",
    URL,
    color = "",
    italic = false,
    bold = false,
    underline = false,
    backgroundColor = "",
    textColor = "",
    className = "",
}) {
    const [responseMessage, setResponseMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleClick = async () => {
        if (!URL) {
            setResponseMessage("Error: URL is required.");
            setIsError(true);
            return;
        }

        try {
            const response = await axios({
                method: METHOD,
                url: URL,
            });
            setResponseMessage(response.data.message || "Request completed successfully.");
            setIsError(false);
        } catch (error) {
            setResponseMessage(error.response?.data?.message || error.message);
            setIsError(true);
        }
    };

    // Dynamically build the className based on props
    const dynamicClasses = [
        color, // Apply the color class
        italic ? "italic" : "", // Apply italic if true
        bold ? "font-bold" : "", // Apply bold if true
        underline ? "underline" : "", // Apply underline if true
        backgroundColor ? `bg-${backgroundColor}` : "", // Apply background color
        textColor ? `text-${textColor}` : "", // Apply text color
        className, // Include any additional classes passed as props
    ]
        .filter(Boolean) // Remove empty strings
        .join(" "); // Join classes with a space

    return (
        <div>
            <button onClick={handleClick} className={`btn ${dynamicClasses}`}>
                {text}
            </button>
            {responseMessage && (
                <div
                    className={`alert mt-4 ${
                        isError ? "alert-error" : "alert-success"
                    } shadow-lg`}
                >
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isError
                                        ? "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" // Cross icon for error
                                        : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" // Check icon for success
                                }
                            />
                        </svg>
                        <span>{responseMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
}