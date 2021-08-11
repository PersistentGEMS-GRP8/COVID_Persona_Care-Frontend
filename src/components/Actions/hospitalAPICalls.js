import axios from 'axios';
import {HOSPITAL} from '../../constants/url';
import authHeader from '../../services/auth-header';


//get all hospitals
export const getHospitalList = () => {
    return axios
        .get(HOSPITAL.GET_ALL, { headers: authHeader() } )
        
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

//get hospital
export const getHospital = (id) => {
    return axios
        .get(HOSPITAL.GET_ALL+id ,{ headers: authHeader() })
        
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


//post hospital
export const postHospital = ({item}) => {
    return axios
        .post(HOSPITAL.POST_HOSPITAL, item, { headers: authHeader() })
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


//delete hospital
export const deleteHospital = (id) => {
    // console.log("IDDDD",id);
    return axios
        .delete(HOSPITAL.GET_ALL+ id , { headers: authHeader() })
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

     //update hospital
     export const updateHospital = (hId,{item}) => {
        return axios
            .put(HOSPITAL.GET_ALL+hId,item, { headers: authHeader() })
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

   