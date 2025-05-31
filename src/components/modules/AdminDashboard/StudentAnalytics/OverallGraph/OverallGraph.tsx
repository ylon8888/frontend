'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';


export default function OverallGraph({correctQuiz, wrongQuiz}: {correctQuiz: number, wrongQuiz: number}) {
  const data = [
  { name: 'Correct Quiz', value: correctQuiz, color: '#fd661f' }, // Orange color
  { name: 'Wrong Quiz', value: wrongQuiz, color: '#82A5A8' }, // Gray/blue color
];
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-900">
          Quiz Overall
        </h2>
        {/* <div className="relative">
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
        </div> */}
      </div>

      <div className="h-64 sm:w-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-center">
        {data?.map((item, idx: number) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl font-bold" style={{ color: item.color }}>
              {item.value}
            </span>
            <span className="text-sm mt-1" style={{ color: item.color }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
