import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signOutEverywhereApi } from '../services/apiAuth.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useSignOutEverywhere(onSuccessCallback) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToaster();

  const { mutate: signOutEverywhere, isPending } = useMutation({
    mutationFn: signOutEverywhereApi,
    onSuccess: () => {
      showToast('Signed out from all devices successfully', '', 'success');

      queryClient.clear();
      if (onSuccessCallback) onSuccessCallback();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      showToast('Error signing out', err.message, 'error');
    },
  });

  return { signOutEverywhere, isPending };
}