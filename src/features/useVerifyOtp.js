import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { verifyOtp } from '../services/apiAuth.js'
import { useToaster } from '../context/ToastContext.jsx'

export function useVerifyOtp() {
  const navigate = useNavigate();
  const { showToast } = useToaster()


  const { mutate: verify, isPending } = useMutation({
    mutationFn: ({ email, token }) =>
      verifyOtp(email, token),

    onSuccess: () => {
      navigate("/");
      showToast("Login successfully" , "Start listening now!" , "success")

    },
  });

  return { verify, isPending };
}