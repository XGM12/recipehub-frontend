import {APIHandler} from "@/core/api/api_handler";
import {Recipe} from "@/types/Recipes";

export const getSearch = async (name: string, categories: string[]): Promise<Recipe[]> => {
    const params = new URLSearchParams();

    params.append('name', name);

    categories.forEach(category => {
        params.append('categories[]', category);
    });

    const response = await APIHandler.get<Recipe[]>(`/search?${params.toString()}`);
    return response.data;
}