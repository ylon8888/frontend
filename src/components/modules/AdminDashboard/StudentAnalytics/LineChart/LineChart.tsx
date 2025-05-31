/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const LineChart = ({ performanceData }: { performanceData: any[] }) => {
  return (
    <div className="w-full h-fit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-900">Analytics Report</h2>
      </div>

      {/* here the report bar chart */}
      {/* Combined Chart */}
      <div className="p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="correct"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
                name="Correct Answers"
              />
              <Area
                type="monotone"
                dataKey="wrong"
                stackId="2"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.2}
                name="Wrong Answers"
              />
              <Line
                type="monotone"
                dataKey="correct"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
