import axios from 'axios';

function get(url: string, param: obj) {
  return axios.get(url, param).then(res => res);
}

function post(url: string, param: obj) {
  return axios.post(url, param).then(res => res);
}

export { get as axiosGet, post };
