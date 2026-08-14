import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteAccountApi } from '../services/apiAuth.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useDeleteAccount(onSuccessCallback) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToaster();

  const { mutate: deleteAccount, isPending: isDeleting } = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      showToast('Your account has been deleted successfully', 'It does not exit anymore', 'success');

      queryClient.clear();
      if (onSuccessCallback) onSuccessCallback();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      showToast('Error deleting account', err.message, 'error');
    },
  });

  return { deleteAccount, isDeleting };
}