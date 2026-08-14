import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/Auth.jsx";
import { getDeletedPlaylistsApi } from '../services/apiPlayLists.js'

export function useDeletedPlaylists() {
  const { user } = useAuth();
  const userId = user?.id;

  const {
    data: deletedPlaylists = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deleted-playlists", userId],
    queryFn: () => getDeletedPlaylistsApi(userId),
    enabled: !!userId,
  });

  return { deletedPlaylists, isLoading, error };
}