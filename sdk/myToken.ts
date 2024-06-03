import { authUrl, clientId, clientSecret } from "./createClient";


export const getMyToken = async () => {
    const myCache = {
        access_token: "",
        expires_in: 0,
        scope: "manage_project:furniture",
        token_type: "Bearer"
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`);
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
            console.log(typeof myCache);
            localStorage.setItem('myCache', JSON.stringify(myCache));
            console.log("result:", result);
        })
        .catch((error) => console.error(error));
}

// export function saveToken(myCache) {
//     localStorage.setItem('myCache', JSON.stringify(myCache));
// }

export function getToken() {
    return localStorage.getItem('myCache');
}

export function isExist() {
    const myCash = localStorage.getItem('myCache');
    return !!myCash;
}

// export function getToken() {
//     const userContext = useContext(UserContext)
//     return userContext.myCache;
// }

// export function setToken(newCache): void {
//     console.log("newCache:", newCache);
//     const userContext = useContext(UserContext)
//     Object.assign(userContext.myCache, newCache);
//     saveToken(userContext.myCache);
// }


