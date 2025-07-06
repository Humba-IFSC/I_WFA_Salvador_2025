
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface InstitutionChartProps {
  data: { name: string; value: number; percentage: number }[];
}

export const InstitutionChart = ({ data }: InstitutionChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg max-w-xs">
          <p className="font-medium text-sm">{label}</p>
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
            Top 10 Instituições
          </h3>
          <p className="text-gray-600">Principais instituições de afiliação dos participantes</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="horizontal"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" fontSize={12} />
              <YAxis 
                type="category"
                dataKey="name" 
                fontSize={10}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="url(#institutionGradient)"
                radius={[0, 4, 4, 0]}
              />
              <defs>
                <linearGradient id="institutionGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f17627" />
                  <stop offset="100%" stopColor="#e35d1d" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
