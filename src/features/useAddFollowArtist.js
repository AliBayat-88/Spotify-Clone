import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToaster } from '../context/ToastContext.jsx'
import { addFollowArtistApi } from '../services/apiArtists.js'

export function useAddFollowArtist() {
  const {showToast} = useToaster()
  const queryClient = useQueryClient()


  const {mutate : addFollowArtist , isLoading} = useMutation({
    mutationFn: ({ userId, artistId }) =>
      addFollowArtistApi({ userId, artistId }),
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey: ['follow_artists'],
      });

      showToast(
        "Followed successfully",
        "You can see it in library",
        "success",
        "library"
      );
    }
  })

  return { addFollowArtist , isLoading }
}