import { useMutation } from '@tanstack/react-query';
import { resendVerificationEmailApi } from '../services/apiAuth.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useResendVerification() {
  const { showToast } = useToaster();

  const { mutate: resendVerification, isPending } = useMutation({
    mutationFn: resendVerificationEmailApi,
    onSuccess: () => {
      showToast("Verification link resent!", "Please check your inbox.", "success");
    },
    onError: (err) => {
      showToast("Failed to resend email", err.message, "error");
    },
  });

  return { resendVerification, isPending };
}