// BaseURL
const PORT_NUMBER = '8088';
const BASE_URL = 'http://localhost:' + PORT_NUMBER+'/COVIDPersonaCare';

// Hospital related URLs
export const HOSPITAL = {
    GET_ALL: BASE_URL + '/hospitals/',
    POST_HOSPITAL: BASE_URL + '/hospitals/',
    GET_HOSPITAL: BASE_URL + '/hospitals/{id}',
    // UPDATE_HOSPITAL: BASE_URL + '/hospitals/',
}

// HospitalAdmin related URLs
export const HADMIN = {
    GET_ALL: BASE_URL + '/hospitalAdmins/',
    POST_HADMIN: BASE_URL + '/hospitalAdmins/',
    GET_HADMIN: BASE_URL + '/hospitalAdmins/{id}',
    // UPDATE_HOSPITAL: BASE_URL + '/hospitals/',
}

export const AUTHENTICATE = {
    POST_CREATETOKEN: BASE_URL + '/authenticate/',

}

export const USER = {
    POST_CREATEUSER: BASE_URL + '/register/',

}



