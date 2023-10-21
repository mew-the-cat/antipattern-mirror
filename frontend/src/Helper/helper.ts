import { auth } from "../Interfaces/auth.interface";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

export function isLoggedIn(props: auth) {
    if (
        props.authenticationToken !== undefined &&
        props.authenticationToken.tokenType !== undefined &&
        props.authenticationToken.tokenType !== "" &&
        props.authenticationToken.accessToken !== undefined &&
        props.authenticationToken.accessToken !== "" &&
        dayjs() < dayjs(props.authenticationToken.expiresAt)
    ) {
        return true;
    }
    logout(props);
    return false;
}

function logout(props: auth) {
    if("setAuthenticationToken" in props && props.setAuthenticationToken !== undefined) {
        props.setAuthenticationToken({
            expiresIn: 0
        });
    }
}

export function fetchAuthenticated(
    url: string,
    props: auth,
    setError: Function,
    setData: Function,
    setLoading: Function
) {
    fetch(process.env.REACT_APP_BACKEND + url, {
        method: "GET",
        headers: {
            "Authorization": props.authenticationToken!.tokenType + " " + props.authenticationToken!.accessToken
        }
    }).then((value) => {
        if (value.ok) {
            return value.json();
        }
        throw value;
    }).then((value) => {
        if ("errors" in value) {
            console.log("GET-" + url + ": Errors - ", value.errors);
            setError(value);
        } else {
            console.log("GET-" + url + ": Values - ", value);
            setData(value);
        }
    }).catch((reason) => {
        console.log("POST-" + url + ": Errors - ", reason);
        setError(reason);
    }).finally(() => {
        setLoading(false);
    });
}