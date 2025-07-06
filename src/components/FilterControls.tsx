
import { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterControlsProps {
  onFilterChange: (filters: any) => void;
}

export const FilterControls = ({ onFilterChange }: FilterControlsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [category, setCategory] = useState('all');

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      dateRange,
      category
    });
  };

  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-wfa-600" />
          <h3 className="text-lg font-semibold gradient-text">Filtros de Análise</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar nas respostas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Período</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                <SelectItem value="last30days">Últimos 30 dias</SelectItem>
                <SelectItem value="last90days">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Categoria</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="education">Formação</SelectItem>
                <SelectItem value="career">Carreira</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="entrepreneurship">Empreendedorismo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleFilterChange}
            className="bg-gradient-to-r from-wfa-500 to-salvador-500 hover:from-wfa-600 hover:to-salvador-600 text-white"
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </Card>
  );
};
