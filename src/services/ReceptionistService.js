import axios from 'axios';

const RECEPTIONIST_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/receptionists";

class ReceptionistService {

    getReceptionistsByHId(hId){
        return axios.get(RECEPTIONIST_API_BASE_URL + '/getByHId/' + hId);
    }

    createReceptionist(receptionist){
        return axios.post(RECEPTIONIST_API_BASE_URL + '/register', receptionist);
    }

    getReceptionistById(receptionistId){
        return axios.get(RECEPTIONIST_API_BASE_URL + '/' + receptionistId);
    }

    updateReceptionist(receptionist){
        return axios.put(RECEPTIONIST_API_BASE_URL, receptionist);
    }

    deleteReceptionist(receptionistId){
        return axios.delete(RECEPTIONIST_API_BASE_URL + '/' + receptionistId);
    }
}

export default new ReceptionistService()