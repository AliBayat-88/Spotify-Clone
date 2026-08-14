import { useMutation } from '@tanstack/react-query';
import { useToaster } from '../context/ToastContext.jsx';
import { changePasswordApi } from '../services/apiUser.js';

export function useChangePassword(onSuccessCallback) {
  const { showToast } = useToaster();

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      showToast('Your password has been changed successfully', '', 'success');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error', err.message, 'error');
    },
  });

  return { changePassword, isPending };
}