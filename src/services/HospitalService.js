import axios from 'axios';

const Hospital_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/hospitals";

class HospitalService{
    getHospitalByName(hospitalName){
        return axios.get(Hospital_API_BASE_URL + '/search?name=' + hospitalName);
    }
}

export default new HospitalService();