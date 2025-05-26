import React, { useEffect, useState } from 'react';
import {
    getSpareParts,
    createSparePart,
    updateSparePart,
    deleteSparePart,
} from '../api/sparePart.api';

import type { SparePart } from '../api/sparePart.api';

const SparePartPage: React.FC = () => {
    const [spareParts, setSpareParts] = useState<SparePart[]>([]);
    const [form, setForm] = useState<SparePart>({
        Name: '',
        Category: '',
        Quantity: 0,
        UnitPrice: 0,
        TotalPrice: 0,
    });
    const [editingName, setEditingName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchSpareParts = async () => {
        try {
            const res = await getSpareParts();
            const normalized = res.data.map((sp: SparePart) => ({
                ...sp,
                UnitPrice: Number(sp.UnitPrice) || 0,
                TotalPrice: Number(sp.TotalPrice) || 0,
                Quantity: Number(sp.Quantity) || 0,
            }));
            setSpareParts(normalized);
        } catch {
            setError('Failed to load spare parts.');
        }
    };

    useEffect(() => {
        fetchSpareParts();
    }, []);

    const resetForm = () => {
        setForm({ Name: '', Category: '', Quantity: 0, UnitPrice: 0, TotalPrice: 0 });
        setEditingName(null);
        setError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'Quantity' || name === 'UnitPrice' ? Number(value) : value,
            TotalPrice:
                name === 'Quantity' || name === 'UnitPrice'
                    ? (name === 'Quantity' ? Number(value) : prev.Quantity) *
                    (name === 'UnitPrice' ? Number(value) : prev.UnitPrice)
                    : prev.TotalPrice,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingName) {
                await updateSparePart(editingName, form);
            } else {
                await createSparePart(form);
            }
            fetchSpareParts();
            resetForm();
        } catch {
            setError('Failed to save spare part.');
        }
    };

    const handleEdit = (sp: SparePart) => {
        setForm(sp);
        setEditingName(sp.Name);
        setError(null);
    };

    const handleDelete = async (name: string) => {
        if (!window.confirm('Delete this spare part?')) return;
        try {
            await deleteSparePart(name);
            fetchSpareParts();
        } catch {
            setError('Failed to delete spare part.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl mb-6">Spare Parts</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded">
                <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    value={form.Name}
                    onChange={handleChange}
                    disabled={!!editingName}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="Category"
                    placeholder="Category"
                    value={form.Category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="Quantity"
                    placeholder="Quantity"
                    value={form.Quantity}
                    onChange={handleChange}
                    min={0}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="UnitPrice"
                    placeholder="Unit Price"
                    value={form.UnitPrice}
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
                        value={form.Quantity * form.UnitPrice}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingName ? 'Update' : 'Add'}
                </button>
                {editingName && (
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
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Category</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Unit Price</th>
                        <th className="border border-gray-300 p-2">Total Price</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {spareParts.map((sp) => (
                        <tr key={sp.Name}>
                            <td className="border border-gray-300 p-2">{sp.Name}</td>
                            <td className="border border-gray-300 p-2">{sp.Category}</td>
                            <td className="border border-gray-300 p-2">{sp.Quantity}</td>
                            <td className="border border-gray-300 p-2">{sp.UnitPrice.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2">{sp.TotalPrice.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(sp)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(sp.Name)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {spareParts.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center p-4 text-gray-500">
                                No spare parts found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SparePartPage;
