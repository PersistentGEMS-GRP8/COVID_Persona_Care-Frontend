import axios from 'axios';
import { BASE_URL } from '../constants/url';

const instance = axios.create({
  //   baseURL: BASE_URL,
  proxy: true,
});

instance.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedError) {
    console.log(err);
    alert('An unexpected error occured ');
  }

  return Promise.reject(err);
});

instance.interceptors.request.use(
  (request) => {
    const unsecureEndPoint =
      request.url.includes('register') || request.url.includes('authenticate');
    // need to add token
    if (!unsecureEndPoint) {
      request.headers[
        'Authorization'
      ] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImlzQWRtaW4iOnRydWUsImV4cCI6MTYyODY5ODg4NywiaWF0IjoxNjI4NjgwODg3fQ.LfnwMat_1xTlOpHzP5rl7Qd_wlUHM9LtBqIvF06ZybjFV6-iUj0LvW6UeExFoVG9gRpV65AzMJ5KVssTa4UgDw`;
    }

    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default {
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
};
