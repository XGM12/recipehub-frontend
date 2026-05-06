import {useQuery} from "@tanstack/react-query";
import {getCommunityRecipes, getSystemRecipes} from "@/core/actions/recipes_action";

export const useRecipes = (id?: number) => {
    const querySystemRecipes = useQuery({
        queryKey: ['system-recipes'],
        queryFn: () => getSystemRecipes(),
        staleTime: 1000 * 60 * 60,
    });

    const queryCommunityRecipes = useQuery({
        queryKey: ['community-recipes', id],
        queryFn: () => getCommunityRecipes(id as number),
        staleTime: 1000 * 60 * 60.
    });

    return {
        querySystemRecipes,
        queryCommunityRecipes
    }
}