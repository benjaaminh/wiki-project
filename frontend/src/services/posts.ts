import axios from 'axios';
import { apiBaseUrl } from "../constants";

let token=null;
let config=null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
  config  = {
    headers: { Authorization: token },
  };
};
export default { setToken };