import axios from '../utils/axiosConfig';

export interface SparePart {
  Name: string;
  Category: string;
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
}

const baseUrl = '/api/spareparts';

export const getSpareParts = () => axios.get<SparePart[]>(baseUrl);

export const getSparePart = (name: string) => axios.get<SparePart>(`${baseUrl}/${encodeURIComponent(name)}`);

export const createSparePart = (data: SparePart) => axios.post(baseUrl, data);

export const updateSparePart = (name: string, data: Partial<SparePart>) =>
  axios.put(`${baseUrl}/${encodeURIComponent(name)}`, data);

export const deleteSparePart = (name: string) => axios.delete(`${baseUrl}/${encodeURIComponent(name)}`);
