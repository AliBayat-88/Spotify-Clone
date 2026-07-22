import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../services/apiAuth.js'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate();


  const {mutate : login , isPending} = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.log(err)
    }
  })


  return {login , isPending}
}