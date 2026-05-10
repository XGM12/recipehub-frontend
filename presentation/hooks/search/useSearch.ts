import {useQuery} from "@tanstack/react-query";
import {getSearch} from "@/core/actions/search_action";

export const useSearch = (name: string, categories: string[]) => {
    const querySearch = useQuery({
        queryKey: ['search', name, categories],
        queryFn: () => getSearch(name, categories),
        staleTime: 0,
        // [SOSTENIBILIDAD] Solo ejecuta la query si hay criterios de búsqueda,
        // evitando llamadas innecesarias a la API.
        enabled: name.length >= 3 || categories.length > 0,
    });

    return {
        querySearch,
    }
}