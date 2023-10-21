import React from "react";
interface MessageOutProps {
    message: string;
    time: string;
    date: string;
}
export function MessageOut({message, time, date}: MessageOutProps) {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{message}</p>
                <span className="time_date"> {time}    |    {date}</span> </div>
        </div>
    )
}