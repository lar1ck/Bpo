import axios from '../utils/axiosConfig';

export interface StockOut {
  StockOutQuantity: number;
  StockOutUnitPrice: number;
  StockOutTotalPrice: number;
  StockOutDate: string; // ISO string date
  Name: string;
}

const baseUrl = '/api/stockout';

export const getStockOuts = () => axios.get<StockOut[]>(baseUrl);

export const getStockOut = (id: number) => axios.get<StockOut>(`${baseUrl}/${id}`);

export const createStockOut = (data: StockOut) => axios.post(baseUrl, data);

export const updateStockOut = (id: number, data: Partial<StockOut>) =>
  axios.put(`${baseUrl}/${id}`, data);

export const deleteStockOut = (id: number) => axios.delete(`${baseUrl}/${id}`);
