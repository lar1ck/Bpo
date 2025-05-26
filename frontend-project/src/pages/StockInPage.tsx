import React, { useEffect, useState } from 'react';
import {
    getStockIns,
    createStockIn,
    updateStockIn,
    deleteStockIn,
} from '../api/stockIn.api';

import type { StockIn } from '../api/stockIn.api';

const StockInPage: React.FC = () => {
    const [stockIns, setStockIns] = useState<StockIn[]>([]);
    const [form, setForm] = useState<StockIn>({
        StockInQuantity: 0,
        StockInDate: '',
        Name: '',
    });

    // To track the original name/date when editing
    const [editingKeys, setEditingKeys] = useState<{ name: string; date: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchStockIns = async () => {
        try {
            const res = await getStockIns();
            setStockIns(res.data);
        } catch {
            setError('Failed to load stock-in records.');
        }
    };

    useEffect(() => {
        fetchStockIns();
    }, []);

    const resetForm = () => {
        setForm({ StockInQuantity: 0, StockInDate: '', Name: '' });
        setEditingKeys(null);
        setError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'StockInQuantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingKeys) {
                const date = new Date(form.StockInDate).toLocaleDateString('en-CA');
                await updateStockIn(editingKeys.name, editingKeys.date, {
                    Name: form.Name,
                    StockInDate: date,
                    StockInQuantity: form.StockInQuantity,
                });
            } else {
                await createStockIn(form);
            }
            fetchStockIns();
            resetForm();
        } catch {
            setError('Failed to save stock-in record.');
        }
    };

    const handleEdit = (stockIn: StockIn) => {
        const date = new Date(form.StockInDate).toLocaleDateString('en-CA');
        setForm(stockIn);
        setEditingKeys({ name: stockIn.Name, date: date });
        setError(null);
    };

    const handleDelete = async (name: string, date: string) => {
        const Fdate = new Date(date).toLocaleDateString('en-CA');

        if (!window.confirm('Delete this stock-in record?')) return;
        try {
            await deleteStockIn(name, Fdate);
            fetchStockIns();
        } catch {
            setError('Failed to delete stock-in record.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl mb-6">Stock In</h1>
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
                    name="StockInQuantity"
                    placeholder="Quantity"
                    value={form.StockInQuantity}
                    onChange={handleChange}
                    min={0}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="StockInDate"
                    placeholder="Stock In Date"
                    value={form.StockInDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {editingKeys ? 'Update' : 'Add'}
                </button>
                {editingKeys && (
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
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockIns.length ? (
                        stockIns.map((si) => (
                            <tr key={`${si.Name}-${si.StockInDate}`}>
                                <td className="border border-gray-300 p-2">{si.Name}</td>
                                <td className="border border-gray-300 p-2">{si.StockInQuantity}</td>
                                <td className="border border-gray-300 p-2">
                                    {new Date(si.StockInDate).toLocaleDateString('en-CA')}
                                </td>
                                <td className="border border-gray-300 p-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(si)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(si.Name, si.StockInDate)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center p-4 text-gray-500">
                                No stock-in records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StockInPage;
