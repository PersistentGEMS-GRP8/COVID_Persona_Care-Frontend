import axios from "axios";

const API_URL = "http://localhost:8088/COVIDPersonaCare/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "authenticate", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  getCurrentToken() {
    return JSON.parse(localStorage.getItem('token'));;
  }
}

export default new AuthService();