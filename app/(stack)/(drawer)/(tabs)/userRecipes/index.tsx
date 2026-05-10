import {Text, View} from "react-native";
import {useUserStore} from "@/presentation/hooks/store/useStore";
import {useRecipes} from "@/presentation/hooks/recipes/useRecipes";

const UserRecipesScreen = () => {
    const {user} = useUserStore();
    const {queryUserRecipes} = useRecipes(user?.id);

    const userRecipes = queryUserRecipes.data?.flat() ?? []

    return (
        <View>
            <Text>UserRecipesScreen</Text>
        </View>
    );
}

export default UserRecipesScreen;