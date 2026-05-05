import {useMutation} from "@tanstack/react-query";
import {postLogin, postRegister} from "@/core/actions/auth_action";

export const useAuth = () => {
    const queryLogin = useMutation({
        mutationFn: ({email, password}: {
            email: string;
            password: string;
        }) => postLogin(email, password),
    });


    const queryRegister = useMutation({
        mutationFn: ({name, password, email}: {
            name: string,
            password: string,
            email: string
        }) => postRegister(name, password, email),
    });

    return {
        queryLogin,
        queryRegister
    }
}