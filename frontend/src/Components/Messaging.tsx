import React, {useEffect, useState} from 'react';
import "../Assets/css/messaging.css";
import {auth} from "../Interfaces/auth.interface";
import jwtDecode from "jwt-decode";
import {MessageList} from "./MessageList";
import dayjs from "dayjs";
import {MessageIn} from "./MessageIn";
import {MessageOut} from "./MessageOut";

// Need Endpoint für Messages usw.

const Messaging = (props: auth) => {
    const [data, setData] = useState([]);

    const [list, setList] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [messages, setMessages] = useState([]);

    const fetchOptions = {}

    let client_id = 0;
    if (props.authenticationToken !== undefined) {
        if (props.authenticationToken.accessToken != null) {
            //@ts-ignore
            client_id = jwtDecode(props.authenticationToken.accessToken).client_id;
            console.log("props.authenticationToken.accessToken");
            console.log(props.authenticationToken.accessToken);
            console.log(jwtDecode(props.authenticationToken.accessToken));
        }
    }

    useEffect(() => {
        console.log("Blob");
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        const list = [];

        // @ts-ignore
        for (let i = 0; i < data.length; i++) {

            list.push({
                // @ts-ignore
                firstname: data[i].Advisor.User.firstname,
                // @ts-ignore
                lastname: data[i].Advisor.User.lastname,
                date: dayjs().format("DD.MM.YYYY"),
                image: "https://thispersondoesnotexist.com/",
                message: "",
                // @ts-ignore
                client_id: data[i].Client.id,
                // @ts-ignore
                advisorId: data[i].Advisor.id
            })
        }

        // @ts-ignore
        setList(list);
    }, [data])

useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "/chat/client/" + client_id, fetchOptions)
        .then((value) => {
            if(value.ok) {
                return value.json();
            }
            throw value;
        })
        .then((value) => {
            setData(value);




            console.log(value);
        }).catch((reason) => {
        setError(reason);
    }).finally(() => {
        setLoading(false);
    })
}, []);



    const sendMessage = () => {
        fetch(process.env.REACT_APP_BACKEND + "/chat/message/" + "/", {
            method: "POST",

        })
            .then((value) => {
                if(value.ok) {
                    return value.json();
                }
                throw value;
            })
            .then((value) => {
                setData(value);
            }).catch((reason) => {
                setError(reason);
            }).finally(() => {
                setLoading(false);
            })
    }

    if(loading) {
        return  (
            <p>Loading...</p>
        );
    }

    return (
        <div className="messaging mt-3">
            <div className="inbox_msg">
                <div className="inbox_people">
                    <div className="headind_srch">
                        <div className="recent_heading">
                            <h4>Recent</h4>
                        </div>
                    </div>
                    <div className="inbox_chat">
                        {list.map((item, index) => {

                            return (
                                <MessageList
                                    // @ts-ignore
                                    firstname={item.firstname}
                                    // @ts-ignore
                                    lastname={item.lastname}
                                    // @ts-ignore
                                    date={item.date}// @ts-ignore
                                    image={item.image}
                                    // @ts-ignore
                                    message={item.message}
                                    // @ts-ignore
                                    clientId={item.client_id}
                                    // @ts-ignore
                                    advisorId={item.advisorId}
                                    setMessages={setMessages}
                                />
                            )
                        })}



                    </div>
                </div>
                <div className="mesgs">
                    <div className="msg_history">


                        {
                            messages.map((item, index) => {
                                // @ts-ignore
                                const message = item.message;

                                const test = true;

                                if(test) {
                                    test != test;
                                    return (
                                        <MessageIn
                                            image={'https://thispersondoesnotexist.com/'}
                                            message={message}
                                            time={''}
                                            date={''}
                                        />
                                    )
                                } else {
                                    test != test;
                                    return (
                                        <MessageOut
                                            message={message}
                                            time={''}
                                            date={''}
                                        />
                                    )
                                }
                            })
                        }

                    </div>
                    <div className="type_msg">
                        <div className="input_msg_write">
                            <input type="text" className="write_msg" placeholder="Type a message"/>
                            <button onClick={sendMessage} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o"
                                                                              aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messaging;
