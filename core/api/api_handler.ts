import axios from "axios";

export const APIHandler = axios.create({
    baseURL: "http://10.108.56.66:8082",
});