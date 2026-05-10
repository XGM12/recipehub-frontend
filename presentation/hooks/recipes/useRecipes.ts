import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    deleteFavoriteRecipe, editRecipe,
    getCommunityRecipes,
    getFavoriteRecipe,
    getRecipe,
    getSystemRecipes, getUserRecipes,
    postFavoriteRecipe, postRecipe, RecipeForm
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
        staleTime: 0,
    });

    const queryRecipe = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipe(id as number),
        staleTime: 0,
    });

    const queryFavourite = useQuery({
        queryKey: ['favourite-recipe', id],
        queryFn: () => getFavoriteRecipe(id as number),
        staleTime: 0,
    });

    const queryUserRecipes = useQuery({
        queryKey: ['user-recipes', id],
        queryFn: () => getUserRecipes(id as number),
        staleTime: 0
    });

    const mutateAddFavourite = useMutation({
        mutationFn: ({userId, recipeId}: { userId: number, recipeId: number }) =>
            postFavoriteRecipe(userId, recipeId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['recipe', id]});
            queryClient.invalidateQueries({queryKey: ['favourite-recipe', id]});
        }
    });

    const mutateRemoveFavourite = useMutation({
        mutationFn: ({userId, recipeId}: { userId: number, recipeId: number }) =>
            deleteFavoriteRecipe(userId, recipeId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['recipe', id]});
            queryClient.invalidateQueries({queryKey: ['favourite-recipe', id]});
        }
    });

    const mutateCreateRecipe = useMutation({
        mutationFn: ({id, recipe}: { id: number, recipe: RecipeForm }) =>
            postRecipe(id, recipe),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['community-recipes', id]});
            queryClient.invalidateQueries({queryKey: ['user-recipes', id]});
        }
    });

    const mutateEditRecipe = useMutation({
        mutationFn: ({userId, recipeId, recipe}: { userId: number, recipeId: number, recipe: RecipeForm }) =>
            editRecipe(userId, recipeId, recipe),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['community-recipes', id]});
            queryClient.invalidateQueries({queryKey: ['user-recipes', id]});
            queryClient.invalidateQueries({queryKey: ['recipe', id]});
        }
    });

    return {
        querySystemRecipes,
        queryCommunityRecipes,
        queryRecipe,
        queryFavourite,
        mutateAddFavourite,
        mutateRemoveFavourite,
        mutateCreateRecipe,
        mutateEditRecipe,
        queryUserRecipes
    }
}