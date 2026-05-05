import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {router} from "expo-router";
import {useUserStore} from "@/presentation/hooks/store/useStore";
import ThemedTextInput from "@/presentation/components/shared/ThemedTextInput";
import {useAuth} from "@/presentation/hooks/auth/useAuth";

const AuthScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {queryLogin} = useAuth();

    const handleLogin = async () => {
        queryLogin.mutate(
            {email, password},
            {
                onSuccess: (user) => {
                    useUserStore.getState().login(user);
                    router.push("/home");
                },
                onError: (error) => {
                    setError("No se ha podido acceder al usuario");
                }
            }
        );
    }

    return (
        <View className="flex-1 bg-gray-100 justify-center px-6">
            <View className="bg-white rounded-2xl p-6 shadow-lg">
                <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Inicio Sesión
                </Text>

                <View className="mb-4">
                    <Text className="text-gray-600 mb-2 font-medium">
                        Correo electrónico
                    </Text>

                    <ThemedTextInput
                        placeholder="ejemplo@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
                    />
                </View>

                <View className="mb-6">
                    <Text className="text-gray-600 mb-2 font-medium">
                        Contraseña
                    </Text>
                    <ThemedTextInput
                        placeholder="Introduce aquí la contraseña"
                        secureTextEntry
                        onChangeText={setPassword}
                        className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
                    />
                </View>

                <Pressable
                    onPress={handleLogin}
                    className="bg-blue-600 rounded-xl py-3 active:opacity-80"
                >
                    <Text className="text-white text-center font-semibold text-lg">
                        Entrar
                    </Text>
                </Pressable>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-500">
                        ¿No tienes cuenta?{" "}
                    </Text>
                    <Text
                        className="text-blue-600 font-semibold"
                        onPress={() => router.push("/auth/register")}
                    >
                        Regístrate
                    </Text>
                </View>
                <View>
                    <Text className="text-red-500">
                        {error}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default AuthScreen