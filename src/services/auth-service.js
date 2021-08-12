import axios from "axios";
import jwtDecode from "jwt-decode";

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
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("user", JSON.stringify(jwtDecode(response.data.token)));
        }
        console.log("response.status", response.status)
        return response.status;
      }).catch(function(e){
        console.log(e);
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