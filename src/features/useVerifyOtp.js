import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { verifyOtp } from '../services/apiAuth.js'

export function useVerifyOtp() {
  const navigate = useNavigate();

  const { mutate: verify, isPending } = useMutation({
    mutationFn: ({ email, token }) =>
      verifyOtp(email, token),

    onSuccess: () => {
      navigate("/");
    },
  });

  return { verify, isPending };
}