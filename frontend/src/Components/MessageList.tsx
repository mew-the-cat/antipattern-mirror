import React, {useEffect} from "react";
// Da war noch ein chat-active. Keine Ahnung was es damit auf sich hat.
type MessageListProps = {
    firstname: string;
    lastname: string;
    date: string;
    message: string;
    image: string;
    setMessages?: any;
    clientId?: number;
    advisorId?: number;
}
export function MessageList({ firstname, lastname, date, message, image, setMessages, clientId, advisorId }: MessageListProps) {

    const loadMessages = () => {
        fetch(process.env.REACT_APP_BACKEND + "/chat/conversation/" + clientId + "/" + advisorId, {
            method: "GET",
        }).then((value) => {
            if(value.ok) {
                return value.json();
            }
            throw value;
        }).then((value) => {
            // @ts-ignore
            setMessages(value.Messages);
            console.log("BOB");
            console.log(value);
        }).catch((reason) => {

        });
    }

    return (
        <div className="chat_list" onClick={loadMessages}>
            <div className="chat_people">
                <div className="chat_img"><img src={image} alt=""/></div>
                <div className="chat_ib">
                    <h5>{firstname + " " + lastname} <span className="chat_date">{date}</span></h5>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}