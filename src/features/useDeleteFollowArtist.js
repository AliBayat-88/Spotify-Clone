import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToaster } from '../context/ToastContext.jsx'
import { deleteFollowArtistApi } from '../services/apiArtists.js'

export function useDeleteFollowArtist () {
  const queryClient = useQueryClient()
  const {showToast} = useToaster()

  const { isLoading: isDeleting, mutate : deleteFollowArtist } = useMutation({
    mutationFn: ({userId , artistId}) => deleteFollowArtistApi({userId , artistId}),
    onSuccess: () => {
      showToast("Successfully deleted the following artist" , "It removed from your liked songs" , "success")
      queryClient.invalidateQueries({ queryKey: ["follow_artists"] });
    }
  });

  return {isDeleting, deleteFollowArtist}
}