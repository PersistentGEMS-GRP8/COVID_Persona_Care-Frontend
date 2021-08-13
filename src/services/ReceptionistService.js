import http from './httpService';

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