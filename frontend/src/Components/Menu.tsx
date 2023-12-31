import {Link} from "react-router-dom";
import React from "react";
import {auth} from "../Interfaces/auth.interface";

export function Menu(props: auth) {
    if(
        props.authenticationToken !== undefined
    ) {
        console.log(props.authenticationToken);
        return (
            <>
                <Link to="/match"><i className="nav-link fa fa-handshake-o fa-2x"></i></Link>
                <Link to="/chat"><i className="nav-link fa fa-comment-o fa-2x"></i></Link>
                <Link to="/logout"><i className="nav-link fa fa-sign-out fa-2x"></i></Link>
            </>
        )
    }

    return (
        <>

        </>
    )
}