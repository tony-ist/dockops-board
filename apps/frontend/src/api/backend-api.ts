import { Configuration, DefaultApi } from '../generated-sources/backend-api';

export const api = new DefaultApi(new Configuration({ basePath: import.meta.env.VITE_BACKEND_URL }));
