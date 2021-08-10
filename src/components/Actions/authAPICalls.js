import axios from 'axios';
import { USER } from '../../constants/url';


//create a user
export const postUser = ({item}) => {
    return axios
        .post(USER.POST_CREATEUSER, item)
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

