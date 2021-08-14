import http from './httpService';

class ManagerService {

    getManagersByHId(hId){
        return http.get('/managers/getByHId/' + hId);
    }

    createManager(manager){
        return http.post('/register', manager);
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
