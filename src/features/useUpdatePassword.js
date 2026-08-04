// features/useUpdatePassword.js
import { useMutation } from '@tanstack/react-query';
import { useToaster } from '../context/ToastContext.jsx';
import { updatePasswordApi } from '../services/apiAuth.js';

export function useUpdatePassword() {
  const { showToast } = useToaster();

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      showToast('Your password has been changed successfully', '', 'success');
    },
    onError: (err) => {
      showToast('Error', err.message, 'error');
    },
  });

  return { updatePassword, isPending };
}