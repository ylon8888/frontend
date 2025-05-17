/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Monthly Data (Each Month of the Year)
const monthlyData = [
  { name: 'Jan', rate: 10 },
  { name: 'Feb', rate: 20 },
  { name: 'Mar', rate: 30 },
  { name: 'Apr', rate: 40 },
  { name: 'May', rate: 55 },
  { name: 'Jun', rate: 70 },
  { name: 'Jul', rate: 80 },
  { name: 'Aug', rate: 90 },
  { name: 'Sep', rate: 100 },
  { name: 'Oct', rate: 110 },
  { name: 'Nov', rate: 125 },
  { name: 'Dec', rate: 140 },
];

// Quarterly Data (Summarized Per Quarter)
const quarterlyData = [
  { name: 'Q1', rate: 60 }, // Jan - Mar
  { name: 'Q2', rate: 30 }, // Apr - Jun
  { name: 'Q3', rate: 70 }, // Jul - Sep
  { name: 'Q4', rate: 45 }, // Oct - Dec
];

// Yearly Data (Summarized Per Year)
const yearlyData = [
  { name: '2020', rate: 400 },
  { name: '2021', rate: 550 },
  { name: '2022', rate: 700 },
  { name: '2023', rate: 900 },
  { name: '2024', rate: 1100 },
  { name: '2025', rate: 1250 },
];

const LineChart = () => {
  //   const monthlyData = salesStats.monthlyData;
  //   const quarterlyData = salesStats.quarterlyData;
  //   const yearlyData = salesStats.yearlyData;

  const [selected, setSelected] = useState('Quarterly');
  const [isRendered, setIsRendered] = useState(false);
  // Determine which data to use based on selection
  const chartData =
    selected === 'Monthly'
      ? monthlyData
      : selected === 'Quarterly'
      ? quarterlyData
      : yearlyData;

  useEffect(() => {
    setIsRendered(true);
  }, []);
  return (
    <div className="w-full h-fit">
      {/* Title & Legend */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">📊 Participation Rate</span>
        </div>
        {/* Toggle Buttons */}
        <div className="flex flex-wrap gap-2">
          {['Monthly', 'Quarterly', 'Yearly'].map((btn) => (
            <button
              key={btn}
              onClick={() => setSelected(btn)}
              className={`px-4 cursor-pointer py-1 rounded-md border ${
                selected === btn
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {isRendered && (
        <div className="w-full xs:w-full h-[350px] xs:h-[450px] -ml-6">
          <ResponsiveContainer width="100%" height="100%">
            <Chart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#B0B0B0" />
              <YAxis
                stroke="#B0B0B0"
                // tickFormatter={(tick) => `${tick}%`} // Display Y-axis as percentage
                // domain={[0, 100]} // Y-axis range from 0 to 100
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '6px',
                  backgroundColor: '#3B3333',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#0B7077"
                strokeWidth={3}
                dot={{ r: 0 }}
              />
            </Chart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default LineChart;
