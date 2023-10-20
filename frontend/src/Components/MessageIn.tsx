import React from "react";

export function MessageIn() {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>Test, which is a new approach to have</p>
                    <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
            </div>
        </div>
    )
}