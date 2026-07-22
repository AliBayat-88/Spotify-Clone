import { useMutation } from '@tanstack/react-query'
import { signUpApi } from '../services/apiAuth.js'
import { useNavigate } from 'react-router-dom'

export function useSignUp() {
  const navigate = useNavigate();


  const {mutate : signUp , isPending} = useMutation({
    mutationFn: signUpApi,
    onSuccess: (_ , variables) => {
      navigate("/signup/verifyEmailPage", { state: {email: variables?.email} });
    },
    onError: (err) => {
      console.log(err)
    }
  })


  return {signUp , isPending}
}
