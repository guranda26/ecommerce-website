import { authUrl, clientId, clientSecret } from "./createClient";


export const getMyToken = async (clientid?: string) => {
    const myCache = {
        access_token: "",
        expires_in: 0,
        scope: "manage_project:furniture",
        token_type: "Bearer"
    }
    console.log(clientid);
    const userId = clientid || clientId;
    console.log(userId);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${Buffer.from(`${userId}:${clientSecret}`).toString('base64')}`);
    const raw = "";
    await fetch(`${authUrl}/oauth/token?grant_type=client_credentials`,
        {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        }
    ).then((response) => response.json())
        .then((result) => {
            Object.assign(myCache, result);

            if (!clientId) {
                localStorage.setItem('anonymCache', JSON.stringify(myCache));
                localStorage.removeItem('myCache');
            }
            else {
                localStorage.setItem('myCache', JSON.stringify(myCache));
                localStorage.removeItem('anonymCache');
            }
        })
        .catch((error) => console.error(error));
}

export function getToken() {
    const myToken = localStorage.getItem('myCache');
    if (myToken) {
        const token = JSON.parse(myToken!);
        return token.access_token;
    }
}

export function isExist() {
    const myCash = localStorage.getItem('myCache');
    return !!myCash;
}


