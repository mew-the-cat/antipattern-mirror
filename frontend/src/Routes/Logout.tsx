import {auth} from "../Interfaces/auth.interface";

export function Logout(props: auth) {
    if(props.setAuthenticationToken !== undefined) {
        props.setAuthenticationToken(undefined);
    }
    localStorage.removeItem("authenticationToken");
    window.location.href = "/";
    return (
        <></>
    )
}