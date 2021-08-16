import http from './httpService';
import Swal from 'sweetalert2';

export const getVaccinesNames = () => {
  return http.get(`/vaccines`);
};

export const addNewVaccineName = (name) => {
  return http.post(`/vaccines`,{name});
};

export const addVaccineToHospital =({newVaccine})=>{
  return http.post(`/vaccinesInHospital`,newVaccine ).then(res => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully Saved',
      showConfirmButton: false,
      timer: 1500
    })
})
.catch(function (error) {
    console.log(error);
})
}
export const getVaccinesInHospital = (hId) => {
  return http.get(`/vaccinesInHospital/${hId}`);
};

export const getVaccineByIdAndHId = (id,hId) => {
  return http.get(`/vaccinesInHospital/getVaccine/${id}/${hId}`);
};

export const editVaccineInHospital =({editedVaccine})=>{
  return http.put(`/vaccinesInHospital`,editedVaccine ).then(res=>{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully Updated',
        showConfirmButton: false,
        timer: 1500
    })
}).catch(function (error) {
  console.log(error);
})   
}

export const deleteVaccineInHospital = (id) => {
    return http.delete(`/vaccinesInHospital/${id}`).then(res=>{
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Deleted',
          showConfirmButton: false,
          timer: 1500
      })
  });
}