import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    deleteFavoriteRecipe,
    getCommunityRecipes,
    getRecipe,
    getSystemRecipes,
    postFavoriteRecipe
} from "@/core/actions/recipes_action";

export const useRecipes = (id?: number | string) => {
    const queryClient = useQueryClient();

    const querySystemRecipes = useQuery({
        queryKey: ['system-recipes'],
        queryFn: () => getSystemRecipes(),
        staleTime: 1000 * 60 * 60,
    });

    const queryCommunityRecipes = useQuery({
        queryKey: ['community-recipes', id],
        queryFn: () => getCommunityRecipes(id as number),
        staleTime: 1000 * 60 * 60,
    });

    const queryRecipe = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipe(id as number),
        staleTime: 1000 * 60 * 60,
    });

    const mutateAddFavourite = useMutation({
        mutationFn: ({userId, recipeId}: { userId: number, recipeId: number }) =>
            postFavoriteRecipe(userId, recipeId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['recipe', id]});
        }
    });

    const mutateRemoveFavourite = useMutation({
        mutationFn: ({userId, recipeId}: { userId: number, recipeId: number }) =>
            deleteFavoriteRecipe(userId, recipeId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['recipe', id]});
        }
    });

    const createRecipe = useMutation({
        // CONTENT FOR THE POST OF THE RECIPE
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['community-recipes', id]})
        }
    });

    return {
        querySystemRecipes,
        queryCommunityRecipes,
        queryRecipe,
        mutateAddFavourite,
        mutateRemoveFavourite
    }
}