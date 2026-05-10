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
            onSubmit={(recipe) => mutateEditRecipe.mutate(
                { userId: user!.id, recipeId: Number(id), recipe },
                { onSuccess: () => router.back() }
            )}
        />
    );
}

export default EditFormScreen;