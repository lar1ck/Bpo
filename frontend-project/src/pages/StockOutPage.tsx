import React, { useEffect, useState } from 'react';
import {
  getStockOuts,
  createStockOut,
  updateStockOut,
  deleteStockOut,
} from '../api/stockOut.api';

import type { StockOut } from '../api/stockOut.api';

const StockOutPage: React.FC = () => {
  const [stockOuts, setStockOuts] = useState<StockOut[]>([]);
  const [form, setForm] = useState<StockOut>({
    StockOutQuantity: 0,
    StockOutUnitPrice: 0,
    StockOutTotalPrice: 0,
    StockOutDate: '',
    Name: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStockOuts = async () => {
    try {
      const res = await getStockOuts();
      setStockOuts(res.data);
    } catch {
      setError('Failed to load stock-out records.');
    }
  };

  useEffect(() => {
    fetchStockOuts();
  }, []);

  const resetForm = () => {
    setForm({
      StockOutQuantity: 0,
      StockOutUnitPrice: 0,
      StockOutTotalPrice: 0,
      StockOutDate: '',
      Name: '',
    });
    setEditingId(null);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const val = name.includes('Quantity') || name.includes('Price') ? Number(value) : value;
      const updated = { ...prev, [name]: val };

      if (
        name === 'StockOutQuantity' ||
        name === 'StockOutUnitPrice' ||
        name === 'StockOutTotalPrice'
      ) {
        updated.StockOutTotalPrice =
          updated.StockOutQuantity * updated.StockOutUnitPrice;
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateStockOut(editingId, form);
      } else {
        await createStockOut(form);
      }
      fetchStockOuts();
      resetForm();
    } catch {
      setError('Failed to save stock-out record.');
    }
  };

  const handleEdit = (stockOut: StockOut, id: number) => {
    setForm(stockOut);
    setEditingId(id);
    setError(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this stock-out record?')) return;
    try {
      await deleteStockOut(id);
      fetchStockOuts();
    } catch {
      setError('Failed to delete stock-out record.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl mb-6">Stock Out</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded">
        <input
          type="text"
          name="Name"
          placeholder="Spare Part Name"
          value={form.Name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="StockOutQuantity"
          placeholder="Quantity"
          value={form.StockOutQuantity}
          onChange={handleChange}
          min={0}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="StockOutUnitPrice"
          placeholder="Unit Price"
          value={form.StockOutUnitPrice}
          onChange={handleChange}
          min={0}
          step="0.01"
          className="w-full p-2 border rounded"
          required
        />
        <div>
          <label className="block mb-1">Total Price:</label>
          <input
            type="number"
            value={form.StockOutQuantity * form.StockOutUnitPrice}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <input
          type="date"
          name="StockOutDate"
          placeholder="Stock Out Date"
          value={form.StockOutDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {editingId !== null ? 'Update' : 'Add'}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 px-4 py-2 rounded border hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Spare Part Name</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Unit Price</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockOuts.length ? (
            stockOuts.map((so, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 p-2">{so.Name}</td>
                <td className="border border-gray-300 p-2">{so.StockOutQuantity}</td>
                <td className="border border-gray-300 p-2">{so.StockOutUnitPrice}</td>
                <td className="border border-gray-300 p-2">{so.StockOutTotalPrice}</td>
                <td className="border border-gray-300 p-2">{so.StockOutDate}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(so, idx)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No stock-out records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockOutPage;
