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

// Create new stock-out entry
export const createStockOut = (data: StockOut) => axios.post(baseUrl, data);

// Update using Name and StockOutDate as identifier
export const updateStockOut = (name: string, date: string, data: Partial<StockOut>) =>
  axios.put(`${baseUrl}/${encodeURIComponent(name)}/${encodeURIComponent(date)}`, data);

// Delete using Name and StockOutDate
export const deleteStockOut = (name: string, date: string) =>
  axios.delete(`${baseUrl}/${encodeURIComponent(name)}/${encodeURIComponent(date)}`);
