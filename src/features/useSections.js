import { useQuery } from '@tanstack/react-query';
import { getAllSectionsApi } from '../services/apiDashboard.js';

export function useSections() {
  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['sections'],
    queryFn: getAllSectionsApi,
  });

  return { sections, isLoading };
}