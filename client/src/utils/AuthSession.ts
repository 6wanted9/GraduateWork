import { Storage } from "./Storage";
import Api from "./Api";

export class AuthSession {
    static accessTokenKey = "__access-token__";

    static isTokenSet() {
        const authToken = Storage.get(AuthSession.accessTokenKey);
        return authToken && !!authToken.trim();
    }

    static updateHeader() {
        if (AuthSession.isTokenSet()) {
            Api.defaults.headers.Authorization = `Bearer ${Storage.get(AuthSession.accessTokenKey)}`;
        } else {
            delete Api.defaults.headers.Authorization;
        }
    }

    static login(token: string) {
        Storage.set(AuthSession.accessTokenKey, token);
        AuthSession.updateHeader();
    }

    static logout(){
        Storage.remove(AuthSession.accessTokenKey);
        AuthSession.updateHeader();
    }
}