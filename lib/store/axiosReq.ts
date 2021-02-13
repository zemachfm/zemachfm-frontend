import axios from 'axios';

function get(url: string, param: object) {
  return axios
    .get(url, {
      params: param,
    })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
}

function post(url: string, param: object) {
  return axios
    .post(url, { ...param })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
}

export { get as axiosGet, post };
