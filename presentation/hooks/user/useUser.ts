import { getUserById } from "@/core/actions/user_action"
import { useQuery } from "@tanstack/react-query"

export const useUser = (id: number | string) => {
	const queryUserById = useQuery({
		queryKey: ['system-recipes'],
		queryFn: () => getUserById(id as number),
		staleTime: 1000 * 60 * 60,
	});

	return {
		queryUserById,
	}
}