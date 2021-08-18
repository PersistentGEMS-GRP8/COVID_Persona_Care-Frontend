import http from './httpService';
import Swal from 'sweetalert2';

export const getHospitalByName = (name) => {
  return http.get('/hospitals/search', { params: { name } });
};

export const getHospitalById = (id) => {
  return http.get(`/hospitals/${id}`);
};

export const updateHospitalBeds = (hId,beds)=>{
  return http.put(`/hospitals/manage_beds`,null,{params:{hId,beds}}).then(res => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully Updated',
        showConfirmButton: false,
        timer: 1500
      })
});
}