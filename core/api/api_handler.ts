import axios from "axios";

export const APIHandler = axios.create({
    baseURL: "http://192.168.1.44:8082",
});