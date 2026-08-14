import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileApi } from '../services/apiUser.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useUpdateProfile() {
  const { showToast } = useToaster();
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    error,
    isPending,
  } = useMutation({
    mutationKey: ['user'],

    mutationFn: updateProfileApi,

    onSuccess: () => {
      showToast(
        'Successfully updated profile',
        '',
        'success'
      );

      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });

  return {
    updateProfile,
    error,
    isPending,
  };
}