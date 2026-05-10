import {APIHandler} from "@/core/api/api_handler";
import {User} from "@/types/User";

export const postLogin = async (email: string, password: string): Promise<User> => {
    try {
        const response = await APIHandler.post<User>("/login", {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error("No se pudo hacer login: " + error);
    }
}

export const postRegister = async (
    name: string,
    password: string,
    email: string
): Promise<User> => {
    try {
        const response = await APIHandler.post<User>("/register", {
            name,
            password,
            email
        });
        return response.data;
    } catch (error) {
        throw new Error("No se pudo registrar el usuario: " + error);
    }
}