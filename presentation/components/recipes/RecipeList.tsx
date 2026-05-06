import {FlatList, View} from "react-native";
import {Recipe} from "@/types/Recipes";
import RecipeCard from "@/presentation/components/recipes/RecipeCard";

interface Props {
    recipes: Recipe[];
}

const RecipeList = ({recipes}: Props) => {
    return (
        <View>
            {recipes.map((recipe, index) => (
                <RecipeCard key={`recipe-${recipe.id ?? index}`} recipe={recipe} />
            ))}
        </View>
    );
}

export default RecipeList;