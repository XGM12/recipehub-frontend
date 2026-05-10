import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {router} from "expo-router";
import {useUserStore} from "@/presentation/hooks/store/useStore";
import ThemedTextInput from "@/presentation/components/shared/ThemedTextInput";
import {useAuth} from "@/presentation/hooks/auth/useAuth";

const LoginScreen = () => {
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
                onError: () => {
                    setError("Correo o contraseña incorrectos");
                }
            }
        );
    }

    return (
        <View className="flex-1 bg-white justify-center px-6">

            {/* Logo */}
            <View className="items-center mb-10">
                <View
                    className="items-center justify-center bg-primary rounded-full mb-4"
                    style={{width: 80, height: 80}}
                >
                    <Text className="text-white font-work-black text-2xl">RH</Text>
                </View>
                <Text style={{fontSize: 32, fontWeight: '900', fontStyle: 'italic'}} className="text-primary">
                    RecipeHub
                </Text>
                <Text className="text-gray-400 text-sm mt-1">Tu libro de cocina digital</Text>
            </View>

            {/* Formulario */}
            <View className="bg-gray-50 rounded-3xl p-6" style={{gap: 16}}>
                <Text style={{fontSize: 22, fontWeight: '900'}} className="text-gray-900 mb-2">
                    Inicio de sesión
                </Text>

                <View style={{gap: 6}}>
                    <Text className="text-gray-600 font-work-medium text-sm">Correo electrónico</Text>
                    <ThemedTextInput
                        placeholder="ejemplo@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        className="border border-gray-200 bg-white rounded-xl px-4 py-3 text-gray-800"
                    />
                </View>

                <View style={{gap: 6}}>
                    <Text className="text-gray-600 font-work-medium text-sm">Contraseña</Text>
                    <ThemedTextInput
                        placeholder="Tu contraseña"
                        secureTextEntry
                        onChangeText={setPassword}
                        className="border border-gray-200 bg-white rounded-xl px-4 py-3 text-gray-800"
                    />
                </View>

                {error ? (
                    <Text className="text-red-500 text-sm text-center">{error}</Text>
                ) : null}

                <Pressable
                    onPress={handleLogin}
                    className="bg-primary rounded-xl py-4 active:opacity-80 mt-2"
                >
                    <Text className="text-white text-center font-work-black text-lg">
                        Entrar
                    </Text>
                </Pressable>

                <View className="flex-row justify-center">
                    <Text className="text-gray-500 text-sm">¿No tienes cuenta? </Text>
                    <Text
                        className="text-primary font-work-bold text-sm"
                        onPress={() => router.push("/auth/register")}
                    >
                        Regístrate
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;