
import { Calendar, Users, Mail, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProcessedData } from '@/hooks/useDataProcessor';

interface DashboardHeaderProps {
  data: ProcessedData;
}

export const DashboardHeader = ({ data }: DashboardHeaderProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const stats = [
    {
      title: 'Total de Respostas',
      value: data.summary.totalResponses,
      icon: Users,
      color: 'from-wfa-500 to-wfa-600',
      bgColor: 'from-wfa-50 to-wfa-100'
    },
    {
      title: 'E-mails Únicos',
      value: data.summary.uniqueEmails,
      icon: Mail,
      color: 'from-salvador-500 to-salvador-600',
      bgColor: 'from-salvador-50 to-salvador-100'
    },
    {
      title: 'Data Inicial',
      value: formatDate(data.summary.dateRange.start),
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100'
    },
    {
      title: 'Última Resposta',
      value: formatDate(data.summary.dateRange.end),
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">
          I WFA 2025 - Salvador/BA
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Painel de Análise de Dados - Workshop de Físicos Afrodescendentes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card p-6 hover:shadow-lg transition-all duration-300 animate-fade-in">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
