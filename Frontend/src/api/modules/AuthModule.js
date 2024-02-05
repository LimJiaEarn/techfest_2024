import { apiFetcher } from "../apiFetcher";

class AuthModule {
  static LOGIN_PATH = "/api/login";

  //static REFRESH_PATH = '/api/refresh';

  /**
   * Performs user login with username and password, retrieves tokens, and stores them.
   * @param {string} username User's username
   * @param {string} password User's password
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async login(username, password) {
    const body = { username, password };
    try {
      const data = await apiFetcher(AuthModule.LOGIN_PATH, "POST", body);

      //Store tokens in localStorage
      this.storeTokens(data.accessToken, data.refreshToken);

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  storeTokens(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  // async refreshToken() {
  // }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }
}

export default AuthModule;
