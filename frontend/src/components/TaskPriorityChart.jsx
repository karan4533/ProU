import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const TaskPriorityChart = ({ data }) => {
  const chartData = [
    { name: 'Low', value: data.low || 0, fill: '#10B981' },
    { name: 'Medium', value: data.medium || 0, fill: '#F59E0B' },
    { name: 'High', value: data.high || 0, fill: '#EF4444' }
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No tasks data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6B7280', fontSize: 14 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          tick={{ fill: '#6B7280', fontSize: 14 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px' 
          }}
          formatter={(value) => [value, 'Tasks']}
        />
        <Legend 
          formatter={(value) => {
            const item = chartData.find(d => d.name === value);
            return `${value} (${item?.value || 0})`;
          }}
        />
        <Bar 
          dataKey="value" 
          radius={[8, 8, 0, 0]}
          label={{ position: 'top', fill: '#6B7280', fontSize: 12 }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaskPriorityChart;

