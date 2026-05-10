import {APIHandler} from "@/core/api/api_handler";
import {Recipe} from "@/types/Recipes";

export const getSystemRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await APIHandler.get<Recipe[]>("/recipes");
        return response.data;
    } catch (error) {
        throw new Error("No se pudo obtener las recetas del sistema: " + error);
    }
}

export const getCommunityRecipes = async (id: number): Promise<Recipe[]> => {
    try {
        const response = await APIHandler.get<Recipe[]>(`/users/${id}/community`);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo obtener las recetas de la comunidad: " + error);
    }
}

export const getRecipe = async (id: number): Promise<Recipe> => {
    try {
        const response = await APIHandler.get<Recipe>(`/recipe/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo obtener los detalles de la receta: " + error);
    }
}

export const getFavoriteRecipe = async (id: number): Promise<Recipe[]> => {
    try {
        const response = await APIHandler.get<Recipe[]>(`/users/${id}/favourites`);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo obtener los favoritos del usuario: " + error);
    }
}

export const postFavoriteRecipe = async (userId: number, recipeId: number) => {
    try {
        const response = await APIHandler.post<Recipe>(`users/${userId}/favourites/${recipeId}`);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo añadir una receta a favoritos: " + error);
    }
}

export const deleteFavoriteRecipe = async (userId: number, recipeId: number) => {
    try {
        await APIHandler.delete(`/users/${userId}/favourites/${recipeId}`);
    } catch (error) {
        throw new Error("No se pudo borrar la receta del usuario: " + error);
    }
}

export const getUserRecipes = async (id: number) => {
    try {
        const response = await APIHandler.get<Recipe[]>(`users/${id}/recipes`);
        return response.data;
    } catch (error) {
        throw new Error("No se puede obtener las recetas del usuario: " + error);
    }
}

export interface RecipeForm {
    name: string;
    category: string;
    prepTimeMinutes: number;
    imageUrl: string;
    steps: {
        step_order: number;
        description: string;
    }[];
    ingredients: {
        name: string;
        quantity: string;
    }[];
}

export const postRecipe = async (id: number, recipe: RecipeForm) => {
    try {
        const response = await APIHandler.post<Recipe>(`/users/${id}/recipes`, recipe);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo crear la receta: " + error);
    }
}

export const editRecipe = async (userId: number, recipeId: number, recipe: RecipeForm): Promise<Recipe> => {
    try {
        const response = await APIHandler.put<Recipe>(`/users/${userId}/recipes/${recipeId}`, recipe);
        return response.data;
    } catch (error) {
        throw new Error("No se pudo editar la receta: " + error);
    }
}