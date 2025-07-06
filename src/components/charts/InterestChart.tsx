
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';

interface InterestChartProps {
  data: { name: string; value: number; percentage: number }[];
}

const COLORS = ['#0ea5e9', '#f17627', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export const InterestChart = ({ data }: InterestChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value} respostas ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold gradient-text">
            Interesse em Participar do Evento
          </h3>
          <p className="text-gray-600">Distribuição das respostas sobre presença no workshop</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
