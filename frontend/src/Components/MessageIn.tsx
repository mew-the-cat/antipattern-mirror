import React from "react";

interface MessageInProps {
    image: string;
    message: string;
    time: string;
    date: string;
}

export function MessageIn({image, message, time, date}: MessageInProps) {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img"> <img src={image} alt="sunil" /> </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{message}</p>
                    <span className="time_date"> {time}    |    {date}</span></div>
            </div>
        </div>
    )
}