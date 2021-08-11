import axios from 'axios';
import { USER } from '../../constants/url';
import authHeader from '../../services/auth-header';


//create a user
export const postUser = ({hAdminCredentials}) => {
    console.log("POSTUSER",hAdminCredentials)
    return axios
        .post(USER.POST_CREATEUSER, hAdminCredentials + { headers: authHeader() })
        .then(res => {
            console.log(res.data);
        })
        .catch(function (error) {
            //handle error 
            console.log(error);
        })
        .finally(function (error) {
            console.log(error);
        })

}

