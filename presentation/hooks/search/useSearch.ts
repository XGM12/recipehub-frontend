import {useQuery} from "@tanstack/react-query";
import {getSearch} from "@/core/actions/search_action";

export const useSearch = (name: string, categories: string[]) => {
    const querySearch = useQuery({
        queryKey: ['search', name, categories],
        queryFn: () => getSearch(name, categories),
        staleTime: 0,
        enabled: name.length > 0 || categories.length > 0
    });

    return {
        querySearch,
    }
}