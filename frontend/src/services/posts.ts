import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from "../constants";
import { Post } from '../types';
let token=null;
let config: AxiosRequestConfig;
const postUrl = `${apiBaseUrl}/posts`;
const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
  config  = {
    headers: { Authorization: token },
  };
};

const create = async (newObject: Post) => {
  const response = await axios.post(postUrl, newObject, config);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(postUrl);
  return response.data;
};

const update = async (id: string, newObject: Post) => {
  const response = await axios.put(`${ postUrl }/${id}`, newObject);
  return response.data;
};

const remove = async (id:string) => {
  const response = await axios.delete(`${ postUrl }/${id}`, config);
  return response.data;
};
//making a post with image file
const postWithFile = async (image: File, newObject: any) => {
  let formData = new FormData();
  formData.append("image", image);

  for (const key in newObject){
    formData.append(key, newObject[key])
  }
  const response = await axios.post(postUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config.headers
    }
  })
return response.data
}

export default { setToken, create, getAll, update, remove, postWithFile };