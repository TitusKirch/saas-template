import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const getTeam = ({ id, options }: { id: string; options?: FetchOptions<TeamsShowResponse> }) =>
    useApiFetch<TeamsShowRequestData, TeamsShowResponse>(`teams/${id}`, {
      ...options,
    });

  return {
    getTeam,
  };
}
