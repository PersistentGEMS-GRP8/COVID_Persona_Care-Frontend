import http from '../../services/httpService'

export const getHospitalList = () => {
    return http
        .get('/hospitals')
        
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

//get hospital
export const getHospital = (id) => {
    return http
        .get('/hospitals/'+id )
        
        .then(res => {
            console.log("RESDATA",res);
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


//post hospital
export const postHospital = ({item}) => {
    return http
        .post('/hospitals/', item)
        .then(res => {
            console.log(res.data);

        })
        .catch(function (error) {
            //handle error 
            console.log(error);
            alert('Hospital already exists');

        })
        .finally(function (error) {
            console.log(error);
        })

}


//delete hospital
export const deleteHospital = (id) => {
    // console.log("IDDDD",id);
    return http
        .delete('/hospitals/'+id)
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
        return http
            .put('/hospitals/'+hId,item)
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


   
   