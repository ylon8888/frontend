/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useGetParticipationRateGraphQuery } from '@/redux/features/student/student.api';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
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

const timePeriods = ['Monthly', 'Quarterly', 'Yearly'];

const LineChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [objectQuery, setObjectQuery] = useState<any[]>([
    {
      name: 'period',
      value: selectedPeriod,
    },
  ]);

  useEffect(() => {
    if (selectedPeriod) {
      setObjectQuery([{ name: 'period', value: selectedPeriod }]);
    }
  }, [selectedPeriod]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetParticipationRateGraphQuery(objectQuery);

  // Get the data object from response or empty object if not available
  const data = response?.data || {};

  // Calculate max value for dynamic Y-axis domain
  const maxDataValue = useMemo(() => {
    if (!data || Object.keys(data).length === 0) return 0;
    return Math.max(...Object.values(data).map(Number));
  }, [data]);

  // Calculate nice step for Y-axis ticks
  const yAxisStep = useMemo(() => {
    if (maxDataValue <= 0) return 10; // Default step if no data
    const step = Math.ceil(maxDataValue / 5); // Aim for about 5 ticks
    return Math.max(10, step); // Minimum step of 10
  }, [maxDataValue]);

  // Format Y-axis ticks
  const formatYAxisTick = (value: number) => {
    return `${value}%`; // Add percentage sign
  };

  // Transform data based on selected period
  const transformData = () => {
    if (!data || Object.keys(data).length === 0) return [];

    if (selectedPeriod === 'Monthly') {
      return Object.entries(data).map(([key, value]) => {
        const month = key.split(' ')[0];
        const shortMonth = month.substring(0, 3);
        return {
          name: shortMonth,
          rate: value,
        };
      });
    }

    if (selectedPeriod === 'Yearly' || selectedPeriod === 'Quarterly') {
      return Object.entries(data).map(([key, value]) => ({
        name: key,
        rate: value,
      }));
    }

    return [];
  };

  const chartData = transformData();

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div className="w-full h-fit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-900">
          Participation Rate
        </h2>
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

      {isRendered && !isLoading && !isFetching && (
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
                domain={[0, Math.max(100, maxDataValue + yAxisStep)]} // Ensure minimum 0-100% range
                tickCount={6} // Approximate number of ticks
                tickFormatter={formatYAxisTick}
                interval="preserveStartEnd" // Ensures first and last ticks are shown
                width={40} // Fixed width for Y-axis labels
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
                activeDot={{ r: 6 }}
              />
            </Chart>
          </ResponsiveContainer>
        </div>
      )}

      {(isLoading || isFetching) && (
        <div className="w-full h-[350px] flex items-center justify-center">
          <p>Loading data...</p>
        </div>
      )}

      {!isLoading && !isFetching && chartData.length === 0 && (
        <div className="w-full h-[350px] flex items-center justify-center">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default LineChart;
