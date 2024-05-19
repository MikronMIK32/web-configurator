import { APIClient } from './ApiClient';

if (!process.env.API_HOST) throw new Error('API_HOST environment variable is required');

export const apiClient = new APIClient(`${process.env.API_HOST}`);
