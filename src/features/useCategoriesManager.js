// features/useCategoriesManager.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  insertCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '../services/apiDashboard.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useInsertCategory(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: insertCategory, isPending: isInserting } = useMutation({
    mutationFn: insertCategoryApi,
    onSuccess: () => {
      showToast('Category created successfully!', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error creating category', err.message, 'error');
    },
  });

  return { insertCategory, isInserting };
}

export function useUpdateCategory(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      showToast('Category updated successfully!', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error updating category', err.message, 'error');
    },
  });

  return { updateCategory, isUpdating };
}

export function useDeleteCategory(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      showToast('Category deleted successfully', '', 'success');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['detailed-sections'] });
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Error deleting category', err.message, 'error');
    },
  });

  return { deleteCategory, isDeleting };
}