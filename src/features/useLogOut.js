import { useMutation } from '@tanstack/react-query'
import { logOutApi } from '../services/apiAuth.js'

export function useLogOut(onSuccessCallback) {
  const { mutate: logOut, isPending : isLoginOut } = useMutation({
    mutationFn: logOutApi,

    onSuccess: () => {
      onSuccessCallback?.();
    },

    onError: (err) => {
      console.log(err);
    },
  });

  return { logOut, isLoginOut };
}