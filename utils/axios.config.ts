import axios from "axios";

export const privateAxios = axios.create({
  withCredentials: true,
  withXSRFToken: true,
});
