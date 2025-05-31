'use client';

import { useGetOverallGraphQuery } from '@/redux/features/student/student.api';
import { ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Time period options with display text and API values
const timePeriodOptions = [
  { display: 'Last 7 Days', value: '7days' },
  { display: 'Last 30 Days', value: '30days' },
  { display: 'Last 90 Days', value: '90days' },
  { display: 'Last Year', value: '365days' },
];

// Color mapping for different data categories
const COLORS = {
  student: '#0b7077', // Teal
  correctQuiz: '#fd661f', // Orange
  wrongQuiz: '#82A5A8', // Gray/blue
};

export default function OverallGraph() {
  const [selectedPeriod, setSelectedPeriod] = useState(timePeriodOptions[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [objectQuery, setObjectQuery] = useState<any[]>([
    {
      name: 'period',
      value: selectedPeriod.value,
    },
  ]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetOverallGraphQuery(objectQuery);

  // Update query when period changes
  useEffect(() => {
    setObjectQuery([{ name: 'period', value: selectedPeriod.value }]);
  }, [selectedPeriod]);

  // Transform API data into format expected by Recharts
  const chartData = useMemo(() => {
    if (!response?.data) return [];

    return [
      {
        name: 'New Student',
        value: response.data.student,
        color: COLORS.student,
      },
      {
        name: 'Correct Quiz',
        value: response.data.correctQuiz,
        color: COLORS.correctQuiz,
      },
      {
        name: 'Wrong Quiz',
        value: response.data.wrongQuiz,
        color: COLORS.wrongQuiz,
      },
    ];
  }, [response]);

  // Calculate total for percentage display
  const total = useMemo(() => {
    return chartData.reduce((sum, entry) => sum + entry.value, 0);
  }, [chartData]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-900">Overall Graph</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-secondary hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {selectedPeriod.display}
            <ChevronDown className="h-4 w-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                {timePeriodOptions.map((period) => (
                  <li key={period.value}>
                    <button
                      onClick={() => {
                        setSelectedPeriod(period);
                        setDropdownOpen(false);
                      }}
                      className={`block cursor-pointer w-full text-left px-4 py-2 text-sm ${
                        selectedPeriod.value === period.value
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {period.display}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="w-full h-[350px] flex items-center justify-center">
          <p>Loading data...</p>
        </div>
      ) : chartData.length > 0 ? (
        <>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={0}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    value,
                    `${name} (${((Number(value) / total) * 100).toFixed(1)}%)`,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            {chartData.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <span
                  className="text-3xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
                <span className="text-sm mt-1" style={{ color: item.color }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-[350px] flex items-center justify-center">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
