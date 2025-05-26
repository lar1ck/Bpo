import React, { useEffect, useState } from 'react';
import { getStockOuts } from '../api/stockOut.api';
import type { StockOut } from '../api/stockOut.api';

interface GroupedStockOuts {
  [date: string]: StockOut[];
}

const DailyStockOutReportPage: React.FC = () => {
  const [groupedData, setGroupedData] = useState<GroupedStockOuts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groupByDate = (data: StockOut[]) => {
    const grouped: GroupedStockOuts = {};
    data.forEach((item) => {
      const date = item.StockOutDate.split('T')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return grouped;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStockOuts();
        const grouped = groupByDate(res.data);
        setGroupedData(grouped);
      } catch {
        setError('Failed to load report data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl mb-6">Daily Stock-Out Report</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && Object.keys(groupedData).length === 0 && (
        <p className="text-gray-500">No stock-out data available.</p>
      )}

      {!loading &&
        Object.entries(groupedData)
          .sort((a, b) => (a[0] < b[0] ? 1 : -1)) // latest first
          .map(([date, entries]) => {
            const dailyTotal = entries.reduce((sum, item) => sum + item.StockOutTotalPrice, 0);
            return (
              <div key={date} className="mb-10">
                <h2 className="text-xl font-semibold mb-2">Date: {date}</h2>
                <table className="w-full border border-gray-300 mb-2">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Spare Part Name</th>
                      <th className="border p-2">Quantity</th>
                      <th className="border p-2">Unit Price</th>
                      <th className="border p-2">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">{item.Name}</td>
                        <td className="border p-2">{item.StockOutQuantity}</td>
                        <td className="border p-2">{item.StockOutUnitPrice}</td>
                        <td className="border p-2">{item.StockOutTotalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right font-semibold text-red-700">
                  Daily Total: {Number(dailyTotal).toFixed(2)}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DailyStockOutReportPage;
