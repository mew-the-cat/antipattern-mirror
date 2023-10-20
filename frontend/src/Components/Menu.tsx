import {Link} from "react-router-dom";
import React from "react";
import {auth} from "../Interfaces/auth.interface";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

export function Menu(props: auth) {
    if(
        props.authenticationToken !== undefined &&
        dayjs(props.authenticationToken.expiresAt) > dayjs()
    ) {
        return (
            <>
                <Link to="/match"><i className="nav-link fa fa-handshake-o fa-2x"></i></Link>
                <Link to="/chat"><i className="nav-link fa fa-comment-o fa-2x"></i></Link>
                <Link to="/profile"><i className="nav-link fa fa-user-o fa-2x"></i></Link>
                <Link to="/logout"><i className="nav-link fa fa-handshake-o fa-2x"></i></Link>
            </>
        )
    }

    return (
        <>
        </>
    )
}