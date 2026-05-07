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

export const getRecipe = async (id: number): Promise<Recipe> => {
    try {
        const response = await APIHandler.get<Recipe>(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getFavoriteRecipe = async (id: number): Promise<Recipe[]> => {
	try {
		const response = await APIHandler.get<Recipe[]>(`/users/${id}/favourites`);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const postFavoriteRecipe = async (userId: number, recipeId: number) => {
    try {
        const response = await APIHandler.post<Recipe>(`users/${userId}/favourites/${recipeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteFavoriteRecipe = async (userId: number, recipeId: number) => {
    try {
        await APIHandler.delete(`/users/${userId}/favourites/${recipeId}`);
    } catch (error) {
        throw error;
    }
}