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

//get hospital admin
export const getHospitalAdmin = (id) => {
        console.log("IDDDD",id);

    return http
        .get('/hospitalAdmins/'+id )
        
        .then(res => {
            console.log("RESDATA",res.data);
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


//post hospital admin
export const postHospitalAdmin = ({item}) => {
    return http
        .post('/hospitalAdmins/', item)
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
    return http
        .delete('/hospitalAdmins/'+ id )
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
        return http
            .put('/hospitalAdmins/'+ id,item)
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

    //register a hospital admin
    export const createHospitalAdmin = ({personaUser}) => {
        console.log("HospitalAdmin",personaUser)
        return http
            .post('/register/', personaUser )
            .then(res => {
                console.log(res);
            })
            .catch(function (error) {
                //handle error 
                console.log(error);
            })
            .finally(function (error) {
                console.log(error);
            })

}

