import axios from "../utils/axiosConfig";

export interface StockIn {
  StockInQuantity: number;
  StockInDate: string; // ISO string date
  Name: string;
}

const baseUrl = "/api/stockin";

export const getStockIns = () => axios.get<StockIn[]>(baseUrl);

export const getStockIn = (id: number) =>
  axios.get<StockIn>(`${baseUrl}/${id}`);

export const createStockIn = (data: StockIn) => axios.post(baseUrl, data);
export const updateStockIn = (
  name: string,
  date: string,
  data: { Name: string; StockInDate: string; StockInQuantity: number }
) => {
  const encodedName = encodeURIComponent(name);
  const encodedDate = encodeURIComponent(date);
  return axios.put(`${baseUrl}/${encodedName}/${encodedDate}`, {
    ...data,
    Name: name,
    StockInDate: date,
  });
};

export const deleteStockIn = (name: string, date: string) => {
  const encodedName = encodeURIComponent(name);
  const encodedDate = encodeURIComponent(date);
  return axios.delete(`${baseUrl}/${encodedName}/${encodedDate}`);
};
