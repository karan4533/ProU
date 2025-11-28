import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  todo: '#6B7280',
  'in-progress': '#3B82F6',
  completed: '#10B981'
};

const TaskStatusChart = ({ data }) => {
  const chartData = [
    { name: 'Todo', value: data.todo || 0, color: COLORS.todo },
    { name: 'In Progress', value: data['in-progress'] || 0, color: COLORS['in-progress'] },
    { name: 'Completed', value: data.completed || 0, color: COLORS.completed }
  ].filter(item => item.value > 0);

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
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [value, 'Tasks']}
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px' 
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value) => {
            const item = chartData.find(d => d.name === value);
            return `${value} (${item?.value || 0})`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskStatusChart;

