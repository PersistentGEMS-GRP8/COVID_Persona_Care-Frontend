import axios from 'axios';
import authHeader from './auth-header';


const API_URL = "https://covid-persona.herokuapp.com/api/";

class UserService {
  getAdminBoard() {
    return axios
    .get(API_URL + 'admin', { headers: authHeader() });
  }

}

export default new UserService();

