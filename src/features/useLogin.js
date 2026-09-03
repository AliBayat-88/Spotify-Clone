import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../services/apiAuth.js'
import { useNavigate } from 'react-router-dom'
import { useToaster } from '../context/ToastContext.jsx'

export function useLogin() {
  const navigate = useNavigate();
  const showToast = useToaster()



  const {mutate : login , isPending} = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate("/");
      showToast("Login successfully" , "Start listening now!" , "success")
    },
    onError: (err) => {
      console.log(err)
    }
  })


  return {login , isPending}
}