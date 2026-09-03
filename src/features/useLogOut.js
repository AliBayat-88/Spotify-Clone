// src/features/useLogOut.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOutApi } from '../services/apiAuth.js';
import { usePlayer } from '../context/PlayerContext.jsx';

export function useLogOut(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { resetPlayer } = usePlayer();

  const { mutate: logOut, isPending: isLoginOut } = useMutation({
    mutationFn: logOutApi,

    onSuccess: () => {
      resetPlayer();
      queryClient.clear();
      onSuccessCallback?.();
    },

    onError: (err) => {
      console.error(err);
    },
  });

  return { logOut, isLoginOut };
}