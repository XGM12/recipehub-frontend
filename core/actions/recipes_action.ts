import {APIHandler} from "@/core/api/api_handler";
import {Recipe} from "@/types/Recipes";

export const getSystemRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await APIHandler.get<Recipe[]>("/recipes");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCommunityRecipes = async (id: number): Promise<Recipe[]> => {
    try {
        const response = await APIHandler.get<Recipe[]>(`/users/${id}/community`);
        return response.data;
    } catch (error) {
        throw error;
    }
}