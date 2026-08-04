import { useMutation } from '@tanstack/react-query';
import { useToaster } from '../context/ToastContext.jsx'
import { forgotPasswordApi } from '../services/apiAuth.js'

export function useForgotPassword() {
  const { showToast } = useToaster();

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      showToast('Check your inbox', 'Password reset link sent to your email', 'success');
    },
    onError: (err) => {
      showToast('Error', err.message, 'error');
    },
  });

  return { forgotPassword, isPending };
}