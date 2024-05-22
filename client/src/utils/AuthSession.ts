import { Storage } from "./Storage";
import Api from "./Api";
import { routePaths } from "../constants/routePaths";

export class AuthSession {
  static accessTokenKey = "__access-token__";

  static isTokenSet(): boolean {
    const authToken = Storage.get(AuthSession.accessTokenKey);
    return !!authToken?.toString()?.trim();
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
    window.location.replace(routePaths.home);
  }

  static logout() {
    Storage.remove(AuthSession.accessTokenKey);
    AuthSession.updateHeader();
    window.location.replace(routePaths.home);
  }
}
