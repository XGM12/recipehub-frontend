import {router, useLocalSearchParams} from "expo-router";
import {useUserStore} from "@/presentation/hooks/store/useStore";
import {useRecipes} from "@/presentation/hooks/recipes/useRecipes";
import RecipeFormComponent from "@/presentation/components/recipes/RecipeFormComponent";

const EditFormScreen = () => {
    const {id} = useLocalSearchParams();
    const {user} = useUserStore();
    const {queryRecipe, mutateEditRecipe} = useRecipes(id as string);

    return (
        <RecipeFormComponent
            title='Editar receta'
            submitLabel='Guardar cambios'
            initialData={queryRecipe.data}
            isLoading={mutateEditRecipe.isPending}
            onSubmit={(recipe) => mutateEditRecipe.mutate(
                { userId: user!.id, recipeId: Number(id), recipe },
                {
                    onSuccess: () => router.push(`/recipe/${id}`),
                    onError: (error: any) => {
                        console.log('Error detallado:', error);
                        console.log('Error response:', error?.response?.data);
                        console.log('Error status:', error?.response?.status);
                    }
                }
            )}
        />
    );
}

export default EditFormScreen;