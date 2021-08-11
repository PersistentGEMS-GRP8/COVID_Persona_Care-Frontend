import axios from 'axios';
import {HADMIN} from '../../constants/url';
import authHeader from '../../services/auth-header';

//get all hospital admins
export const getHospitalAdminList = () => {
    return axios
        .get(HADMIN.GET_ALL , { headers: authHeader() })
        
        .then(res => {
            return res.data;
        })
        .catch(function (error) {
            //handle error 
            console.log(error);
        })
        .finally(function (error) {
            console.log(error);
        })
}

//get hospital admin
export const getHospitalAdmin = (id) => {
        console.log("IDDDD",id);

    return axios
        .get(HADMIN.GET_ALL+id , { headers: authHeader() })
        
        .then(res => {
            console.log("RESDATA",res.data);
            return res.data;
        })
        .catch(function (error) {
            //handle error 
            console.log(error);
        })
        .finally(function (error) {
            console.log(error);
        })
}


//post hospital admin
export const postHospitalAdmin = ({item}) => {
    return axios
        .post(HADMIN.POST_HADMIN, item, { headers: authHeader() })
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


//delete hospital admin
export const deleteHospitalAdmin = (id) => {
    // console.log("IDDDD",id);
    return axios
        .delete(HADMIN.GET_ALL+ id , { headers: authHeader() })
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

     //update hospital admin
     export const updateHospitalAdmin = (id,{item}) => {
        return axios
            .put(HADMIN.GET_ALL+id,item, { headers: authHeader() })
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

    
    //create a user
    export const createHospitalAdmin = ({personaUser}) => {
        console.log("HospitalAdmin",personaUser)
        return axios
            .post(HADMIN.POST_CREATEHADMIN, personaUser + { headers: authHeader() })
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

    // export const updateHospital = (id) => {
    //     return axios
    //         .put(HOSPITAL.GET_ALL+ id)
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch(function (error) {
    //             //handle error 
    //             console.log(error);
    //         })
    //         .finally(function (error) {
    //             console.log(error);
    //         })
    
    // }

   