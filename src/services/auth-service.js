import http from './httpService';
class AuthService {
  login(username, password) {
    return http.post('/authenticate', {
      username,
      password,
    });
    // .then(response => {
    //   if (response.data.token) {
    //     localStorage.setItem("token", JSON.stringify(response.data.token));
    //     localStorage.setItem("id", response.data.id);
    //     localStorage.setItem("user", JSON.stringify(jwtDecode(response.data.token)));
    //   }

    //   return response.status;
    // }).catch(function(e){
    //   console.log(e);
    // });
  }

  // logout() {
  //   localStorage.removeItem('token');
  // }

  getCurrentToken() {
    return JSON.parse(localStorage.getItem('token'));
  }
}

export default new AuthService();
