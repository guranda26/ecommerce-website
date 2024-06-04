import { authUrl, clientId, clientSecret } from "./createClient";
import { projectKey } from "./createClient";


export const getMyToken = async (bodyInit?: { username: string; password?: string }) => {
    const myCache = {
        access_token: "",
        expires_in: 0,
        scope: "manage_project:furniture",
        token_type: "Bearer"
    }

    const myHeaders = new Headers();
    let raw: string | BodyInit = "";
    let grant_type = 'client_credentials';
    let projectkey = '';
    myHeaders.append("Authorization", `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`);
    if (bodyInit) {
        raw = JSON.stringify(bodyInit);
        grant_type = `password&username=${bodyInit.username}&password=${bodyInit.password}`
        projectkey = `/${projectKey}/customers`;
    }
    await fetch(`${authUrl}/oauth${projectkey}/token?grant_type=${grant_type}`,
        {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        }
    ).then((response) => response.json())
        .then((result) => {
            Object.assign(myCache, result);

            if (!bodyInit) {
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


