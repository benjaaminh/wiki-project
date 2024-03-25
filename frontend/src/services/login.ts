import axios from 'axios';
import { LoginCredentials } from '../types';
import { apiBaseUrl } from "../constants";

const login = async (credentials:LoginCredentials) => {//check type
  const response = await axios.post(`${apiBaseUrl}/login`, credentials);
  return response.data;
};

export default { login };