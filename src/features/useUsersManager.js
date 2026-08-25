import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProfilesApi, updateUserRoleApi } from '../services/apiDashboard.js';
import { useToaster } from '../context/ToastContext.jsx';

export function useUsers() {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllProfilesApi,
  });

  return { users, isLoading, error };
}

export function useUpdateUserRole(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  const { mutate: updateUserRole, isPending: isUpdatingRole } = useMutation({
    mutationFn: updateUserRoleApi,
    onSuccess: (data) => {
      showToast(`User role updated to ${data.role.toUpperCase()}`, '', 'success');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      showToast('Failed to update user role', err.message, 'error');
    },
  });

  return { updateUserRole, isUpdatingRole };
}