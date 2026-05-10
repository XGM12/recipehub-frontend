import {APIHandler} from "@/core/api/api_handler";
import {User} from "@/types/User";

export const getUserById = async (id: number): Promise<User> => {
    try {
        const response = await APIHandler.get<User>(`users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo obtener los detalles del usuario: " + error);
    }
}