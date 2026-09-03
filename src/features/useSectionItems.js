import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSectionItemsApi, addSectionItemApi, removeSectionItemApi } from '../services/apiDashboard.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useSectionItems(sectionId) {
  const { data: sectionItems = [], isLoading } = useQuery({
    queryKey: ['section-items', sectionId],
    queryFn: () => getSectionItemsApi(sectionId),
    enabled: Boolean(sectionId),
  });

  return { sectionItems, isLoading };
}

export function useToggleSectionItem(sectionId) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: addItem, isPending: isAdding } = useMutation({
    mutationFn: addSectionItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['section-items', sectionId] });
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
    },
    onError: (err) => {
      showToast('Error adding item', err.message, 'error');
    },
  });

  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: removeSectionItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['section-items', sectionId] });
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
    },
    onError: (err) => {
      showToast('Error removing item', err.message, 'error');
    },
  });

  return { addItem, removeItem, isProcessing: isAdding || isRemoving };
}