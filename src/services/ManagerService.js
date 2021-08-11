import axios from 'axios';

const MANAGER_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/managers";

class ManagerService {

    getManagersByHId(hId){
        return axios.get(MANAGER_API_BASE_URL + '/getByHId/' + hId);
    }

    createManager(manager){
        return axios.post(MANAGER_API_BASE_URL + '/register', manager);
    }

    getManagerById(managerId){
        return axios.get(MANAGER_API_BASE_URL + '/' + managerId);
    }

    updateManager(manager){
        return axios.put(MANAGER_API_BASE_URL, manager);
    }

    deleteManager(managerId){
        return axios.delete(MANAGER_API_BASE_URL + '/' + managerId);
    }
}

export default new ManagerService()