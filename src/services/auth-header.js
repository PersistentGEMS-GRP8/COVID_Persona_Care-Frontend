export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log("token",token);
    if (token) {
      return { Authorization: 'Bearer ' + token}; 
    } else {
      return {};
    }
  }