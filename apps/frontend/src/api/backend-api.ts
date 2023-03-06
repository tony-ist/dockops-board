import { Configuration, DefaultApi } from '../generated-sources/backend-api';

export const api = (jwtToken?: string | null) =>
  new DefaultApi(
    new Configuration({
      basePath: import.meta.env.VITE_BACKEND_URL,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
  );
