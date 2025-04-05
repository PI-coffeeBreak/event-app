import axios from "axios";
import { useState } from "react";

export default function Button({ text, METHOD = "GET", URL, className = "" }) {
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

    return (
        <div>
            <button onClick={handleClick} className={`btn btn-primary ${className}`}>
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