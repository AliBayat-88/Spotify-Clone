import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDetailedSectionsApi,
  createSectionApi,
  deleteSectionApi,
  updateSectionApi
} from '../services/apiDashboard.js'
import { useToaster } from '../context/ToastContext.jsx';

export function useDetailedSections() {
  const { data: sections = [], isLoading, error } = useQuery({
    queryKey: ['detailed-sections'],
    queryFn: getDetailedSectionsApi,
  });

  return { sections, isLoading, error };
}

export function useCreateSection(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: createSection, isPending: isCreating } = useMutation({
    mutationFn: createSectionApi,
    onSuccess: () => {
      showToast('Section created successfully!', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error creating section', err.message, 'error');
    },
  });

  return { createSection, isCreating };
}

export function useDeleteSection(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: deleteSection, isPending: isDeleting } = useMutation({
    mutationFn: deleteSectionApi,
    onSuccess: () => {
      showToast('Section deleted successfully', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error deleting section', err.message, 'error');
    },
  });

  return { deleteSection, isDeleting };
}

export function useUpdateSection(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: updateSection, isPending: isUpdating } = useMutation({
    mutationFn: updateSectionApi,
    onSuccess: () => {
      showToast('Section updated successfully!', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error updating section', err.message, 'error');
    },
  });

  return { updateSection, isUpdating };
}