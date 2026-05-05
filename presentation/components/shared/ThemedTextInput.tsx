import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";
import {
    TextInput,
    TextInputProps,
    View
} from "react-native";
import {useThemeColor} from "@/presentation/themes/use-theme-color";

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({icon, ...rest}: Props) => {
    const primaryColor = useThemeColor({}, "primary");
    useThemeColor({}, "text");
    const [isActive, setIsActive] = useState(false);

    return (
        <View
            style={{
                borderColor: isActive ? primaryColor : "#CCC",
            }}
        >
            <TextInput
                placeholderTextColor="#5C5C5C"
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                {...rest}
            />
        </View>
    );
};

export default ThemedTextInput;
