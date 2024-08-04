import type { FetchOptions } from '@tituskirch/app-base/types/Fetch';

export default function () {
  const getTeam = ({ id, options }: { id: BigInt; options?: FetchOptions<TeamsShowResponse> }) =>
    useApiFetch<TeamsShowRequestData, TeamsShowResponse>(`teams/${id}`, {
      ...options,
    });
  const createTeam = ({
    data,
    options,
  }: {
    data: Ref<TeamsCreateRequestData | undefined>;
    options?: FetchOptions<TeamsCreateResponse>;
  }) =>
    useApiFetch<TeamsCreateRequestData, TeamsCreateResponse>('teams', {
      method: 'POST',
      body: data,
      ...options,
    });
  const updateTeam = ({
    id,
    data,
    options,
  }: {
    id: BigInt;
    data: Ref<TeamsUpdateRequestData | undefined>;
    options?: FetchOptions<TeamsUpdateResponse>;
  }) =>
    useApiFetch<TeamsUpdateRequestData, TeamsUpdateResponse>(`teams/${id}`, {
      method: 'PUT',
      body: data,
      ...options,
    });
  const deleteTeam = ({
    id,
    options,
  }: {
    id: BigInt;
    options?: FetchOptions<TeamsDeleteResponse>;
  }) =>
    useApiFetch<undefined, TeamsDeleteResponse>(`teams/${id}`, {
      method: 'DELETE',
      ...options,
    });

  return {
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam,
  };
}
