import React from "react";
// Da war noch ein chat-active. Keine Ahnung was es damit auf sich hat.
export function MessageList(firstname: string, lastname: string, date: string, message: string, image: string) {
    return (
        <div className="chat_list">
            <div className="chat_people">
                <div className="chat_img"><img src={image}
                                               alt="sunil"/></div>
                <div className="chat_ib">
                    <h5>{firstname + " " + lastname} <span className="chat_date">{date}</span></h5>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}