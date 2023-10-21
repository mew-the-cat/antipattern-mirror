import React, {useState} from 'react';
import "../Assets/css/messaging.css";

// Need Endpoint für Messages usw.

const Messaging = () => {
    const [data, setData] = useState({
        count: 0,
        rows: []
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchOptions = {}

    fetch(process.env.REACT_APP_BACKEND + "", fetchOptions)
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

    const sendMessage = () => {
        fetch(process.env.REACT_APP_BACKEND + "", fetchOptions)
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



                    </div>
                </div>
                <div className="mesgs">
                    <div className="msg_history">




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
