import http from '../../services/httpService'

//get all hospital admins
export const getHospitalAdminList = () => {
    return http
        .get('/hospitalAdmins/')
        
        .then(res => {
            return res;            
        })
        .catch(function (error) {
            //handle error 
            console.log(error);
        })
        .finally(function (error) {
            console.log(error);
        })
}

//get hospital admin by id
export const getHospitalAdmin = (id) => {
    console.log("HospitalAdminID",id);

    return http
        .get('/hospitalAdmins/'+id )
        
        .then(res => {
            console.log("RES.DATA",res.data);
            return res;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function (error) {
            console.log(error);
        })
}

//post hospital admin --> register a hospital admin
export const postHospitalAdmin = (item) => {
    return http
        .post('/register', item)

        .then(res => {
            console.log("HOSPITAL ADMIN",res.data);
            alert('Hospital Admin submitted successfully');
        })
        .catch(function (error) {
            console.log(error);
            if (error.response.status==400){
                alert('UserName already exists');
            }    
        })
        .finally(function (error) {
            console.log(error);
        })
}

//delete hospital admin by id
export const deleteHospitalAdmin = (id) => {
    return http
        .delete('/hospitalAdmins/'+ id )
        .then(res => {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function (error) {
            console.log(error);
        })
    }

//update hospital admin
export const updateHospitalAdmin = (id,{item}) => {
    return http
        .put('/hospitalAdmins/'+ id,item)
        .then(res => {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function (error) {
            console.log(error);
        })
    }

//register a hospital admin --> unused API call

// export const createHospitalAdmin = ({personaUser}) => {
//     console.log("HospitalAdmin",personaUser)
//     return http
//         .post('/register/', personaUser )
//         .then(res => {
//             console.log(res);
//         })
//         .catch(function (error) {
//             //handle error 
//             console.log(error);
//         })
//         .finally(function (error) {
//             console.log(error);
//         })
// }

