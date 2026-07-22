import { useMutation } from '@tanstack/react-query'
import { signInWithOtp } from '../services/apiAuth.js'
import { useNavigate } from 'react-router-dom'

export function useOtp() {
  const navigate = useNavigate();

  const { mutate: otpLogin, isPending } = useMutation({
    mutationFn: signInWithOtp,

    onSuccess: (_, email) => {
      navigate("/login/otp-login", {
        state: { email },
      });
    }
  });

  return { otpLogin, isPending };
}