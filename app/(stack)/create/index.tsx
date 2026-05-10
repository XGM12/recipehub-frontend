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
            onSubmit={(recipe) => mutateCreateRecipe.mutate(
                { id: user!.id, recipe },
                { onSuccess: () => router.back() }
            )}
        />
    );
}

export default CreateFormScreen;