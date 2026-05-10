import {useUserStore} from "@/presentation/hooks/store/useStore";
import {useRecipes} from "@/presentation/hooks/recipes/useRecipes";
import RecipeFormComponent from "@/presentation/components/recipes/RecipeFormComponent";
import {router} from "expo-router";

const CreateFormScreen = () => {
    const {user} = useUserStore();
    const {mutateCreateRecipe} = useRecipes(user?.id);

    return (
        <RecipeFormComponent
            title='Nueva receta'
            submitLabel='Guardar receta'
            isLoading={mutateCreateRecipe.isPending}
            onSubmit={(recipe) => mutateCreateRecipe.mutate(
                {id: user!.id, recipe},
                {
                    onSuccess: (newRecipe) => router.push(`/recipe/${newRecipe.id}`),
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

export default CreateFormScreen;