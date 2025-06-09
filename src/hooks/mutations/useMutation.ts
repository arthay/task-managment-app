import { useCallback } from "react";
import { useSelector } from "react-redux";
import type { T_RootState } from "@/store/setup";

interface I_UseMutationProps<TArgs extends unknown[], R> {
  mutationFn: (...args: TArgs) => Promise<R>;
  getIsPending: (state: T_RootState) => boolean;
}

function useMutation<TArgs extends unknown[], R>({
  mutationFn,
  getIsPending,
}: I_UseMutationProps<TArgs, R>) {
  const isPending = useSelector(getIsPending);

  const mutateAsync = useCallback(
    async (...args: TArgs): Promise<R> => {
      return await mutationFn(...args);
    },
    [mutationFn],
  );

  return { mutateAsync, isPending };
}

export default useMutation;
