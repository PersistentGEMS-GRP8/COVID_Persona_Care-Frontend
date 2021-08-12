import http from './httpService';

// const RECEPTIONIST_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/receptionists";

class ReceptionistService {

    getReceptionistsByHId(hId){
        return http.get('/receptionists/getByHId/' + hId);
    }

    createReceptionist(receptionist){
        return http.post('/receptionists/register', receptionist);
    }

    getReceptionistById(receptionistId){
        return http.get('/receptionists/' + receptionistId);
    }

    updateReceptionist(receptionist){
        return http.put('/receptionists', receptionist);
    }

    deleteReceptionist(receptionistId){
        return http.delete('/receptionists/' + receptionistId);
    }
}

export default new ReceptionistService()

// import axios from 'axios';

// const RECEPTIONIST_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/receptionists";

// class ReceptionistService {

//     getReceptionistsByHId(hId){
//         return axios.get(RECEPTIONIST_API_BASE_URL + '/getByHId/' + hId);
//     }

//     createReceptionist(receptionist){
//         return axios.post(RECEPTIONIST_API_BASE_URL + '/register', receptionist);
//     }

//     getReceptionistById(receptionistId){
//         return axios.get(RECEPTIONIST_API_BASE_URL + '/' + receptionistId);
//     }

//     updateReceptionist(receptionist){
//         return axios.put(RECEPTIONIST_API_BASE_URL, receptionist);
//     }

//     deleteReceptionist(receptionistId){
//         return axios.delete(RECEPTIONIST_API_BASE_URL + '/' + receptionistId);
//     }
// }

// export default new ReceptionistService()