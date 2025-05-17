/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { ChevronDown } from 'lucide-react';
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

// Time period options for the dropdown
const timePeriods = ['Monthly', 'Quarterly', 'Yearly'];

const LineChart = () => {
  //   const monthlyData = salesStats.monthlyData;
  //   const quarterlyData = salesStats.quarterlyData;
  //   const yearlyData = salesStats.yearlyData;

  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Determine which data to use based on selection
  const chartData =
    selectedPeriod === 'Monthly'
      ? monthlyData
      : selectedPeriod === 'Quarterly'
      ? quarterlyData
      : yearlyData;

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div className="w-full h-fit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-900">Overall Graph</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-secondary hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {selectedPeriod}
            <ChevronDown className="h-4 w-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                {timePeriods.map((period) => (
                  <li key={period}>
                    <button
                      onClick={() => {
                        setSelectedPeriod(period);
                        setDropdownOpen(false);
                      }}
                      className={`block cursor-pointer w-full text-left px-4 py-2 text-sm ${
                        selectedPeriod === period
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {period}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
