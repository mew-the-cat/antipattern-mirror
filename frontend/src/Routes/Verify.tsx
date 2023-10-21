//http://localhost:3000/registration/verification?code=320095ee66a3ee7f4c3055920d5b83c4

import {auth} from "../Interfaces/auth.interface";

export function Verify(props: auth) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    if (code) {
        fetch("http://localhost:3001/user/verify", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                code: code,
            })
        }).then((response) => {

        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>Authentication successful</>
    )
}