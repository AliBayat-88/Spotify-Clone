import { useMutation } from '@tanstack/react-query'
import { loginWithGoogle } from '../services/apiAuth.js'

export function useLoginByGoogle() {
  const  {mutate:googleLogin , isLoading} = useMutation({
    mutationFn : loginWithGoogle,
  })

  return {googleLogin, isLoading}
}