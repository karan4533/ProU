import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmployeeWorkloadChart = ({ data }) => {
  // Limit to top 10 employees by workload
  const chartData = data
    .slice(0, 10)
    .map(emp => ({
      name: emp.employeeName.length > 15 
        ? emp.employeeName.substring(0, 15) + '...' 
        : emp.employeeName,
      fullName: emp.employeeName,
      tasks: emp.taskCount,
      role: emp.role
    }));

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No employee workload data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={chartData} 
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          type="number"
          tick={{ fill: '#6B7280', fontSize: 14 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          type="category"
          dataKey="name"
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
          width={120}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px' 
          }}
          formatter={(value, name, props) => [
            `${value} tasks`,
            props.payload.fullName
          ]}
          labelFormatter={(label) => `Role: ${chartData.find(d => d.name === label)?.role || ''}`}
        />
        <Legend />
        <Bar 
          dataKey="tasks" 
          fill="#3B82F6"
          radius={[0, 8, 8, 0]}
          label={{ position: 'right', fill: '#6B7280', fontSize: 12 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmployeeWorkloadChart;

