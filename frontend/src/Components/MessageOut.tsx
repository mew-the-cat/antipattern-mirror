import React from "react";

export function MessageOut(message: string, time: string, date: string) {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{message}</p>
                <span className="time_date"> {time}    |    {date}</span> </div>
        </div>
    )
}