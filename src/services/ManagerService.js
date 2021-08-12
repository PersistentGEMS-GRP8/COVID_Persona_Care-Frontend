import http from './httpService';

// const MANAGER_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/managers";

class ManagerService {

    getManagersByHId(hId){
        return http.get('/managers/getByHId/' + hId);
    }

    createManager(manager){
        return http.post('/managers/register', manager);
    }

    getManagerById(managerId){
        return http.get('/managers/' + managerId);
    }

    updateManager(manager){
        return http.put('/managers', manager);
    }

    deleteManager(managerId){
        return http.delete('/managers/' + managerId);
    }
}

export default new ManagerService()

// export default new ManagerService()

// import axios from 'axios';
// import authHeader from './auth-header';

// const MANAGER_API_BASE_URL = "http://localhost:8088/COVIDPersonaCare/managers";

// class ManagerService {

//     getManagersByHId(hId){
//         return axios.get(MANAGER_API_BASE_URL + '/getByHId/' + hId, { headers: authHeader() });
//     }

//     createManager(manager){
//         return axios.post(MANAGER_API_BASE_URL + '/register', manager);
//     }

//     getManagerById(managerId){
//         return axios.get(MANAGER_API_BASE_URL + '/' + managerId);
//     }

//     updateManager(manager){
//         return axios.put(MANAGER_API_BASE_URL, manager);
//     }

//     deleteManager(managerId){
//         return axios.delete(MANAGER_API_BASE_URL + '/' + managerId);
//     }
// }

// export default new ManagerService()