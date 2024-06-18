import { TokenCache, TokenStore } from "@commercetools/sdk-client-v2";
import { cacheName } from "../src/modules/constantLocalStorage";

export class MyTokenCache implements TokenCache {

    cacheName: string;


    private myCache: TokenStore = {
        token: '',
        expirationTime: 0,
        refreshToken: undefined,
    }

    constructor(cacheName: string) {
        this.cacheName = cacheName;
    }


    saveToken() {
        if (this.cacheName === cacheName.AnonymUser) {
            localStorage.removeItem(cacheName.Login);
        }
        if (this.cacheName === cacheName.Login) {
            localStorage.removeItem(cacheName.AnonymUser);
        }
        localStorage.setItem(this.cacheName, JSON.stringify(this.myCache));
    }

    public get(): TokenStore {
        return this.myCache;
    }

    public set(newCache: TokenStore): void {
        Object.assign(this.myCache, newCache);
        this.saveToken();
    }
}

export function getToken() {
    const myToken = localStorage.getItem(cacheName.Login) || localStorage.getItem(cacheName.AnonymUser);
    if (myToken) {
        const token: TokenStore = JSON.parse(myToken) as TokenStore;
        return token?.token;
    }
    return null;
}

export function getRefreshToken() {
    const myToken = localStorage.getItem(cacheName.Login) || localStorage.getItem(cacheName.AnonymUser);
    if (myToken) {
        const token: TokenStore = JSON.parse(myToken) as TokenStore;
        return token?.refreshToken;
    }
    return null;
}

export function isExist() {
    const myCash = localStorage.getItem(cacheName.Login);
    return !!myCash;
}

export function isExistAnonymToken() {
    const myCash = localStorage.getItem(cacheName.AnonymUser);
    return !!myCash;
}




