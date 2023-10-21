import Messaging from "../Components/Messaging";
import {auth} from "../Interfaces/auth.interface";

export function Chat(props: auth) {
    return (
        <Messaging
            authenticationToken={props.authenticationToken}
            setAuthenticationToken={props.setAuthenticationToken}
        />
    );
}