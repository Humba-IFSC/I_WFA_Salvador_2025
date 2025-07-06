
import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DashboardHeader } from '@/components/DashboardHeader';
import { FilterControls } from '@/components/FilterControls';
import { InterestChart } from '@/components/charts/InterestChart';
import { EducationChart } from '@/components/charts/EducationChart';
import { InstitutionChart } from '@/components/charts/InstitutionChart';
import { EnglishLevelChart } from '@/components/charts/EnglishLevelChart';
import { CareerPathsChart } from '@/components/charts/CareerPathsChart';
import { useDataProcessor, ProcessedData } from '@/hooks/useDataProcessor';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { data, loading, error, processFile } = useDataProcessor();
  const { toast } = useToast();
  const [filters, setFilters] = useState({});

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name);
    await processFile(file);
    
    if (error) {
      toast({
        title: 'Erro ao processar arquivo',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Arquivo processado com sucesso!',
        description: `Dados carregados: ${file.name}`,
      });
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
    // Here you would implement the actual filtering logic
  };

  const handleExportData = () => {
    if (data) {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'wfa_2025_analysis.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Dados exportados!',
        description: 'Arquivo JSON baixado com sucesso.',
      });
    }
  };

  const handleResetData = () => {
    window.location.reload();
  };

  if (!data) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">
              I WFA 2025 - Salvador/BA
            </h1>
            <p className="text-xl text-gray-600">
              Painel de Análise de Dados - Workshop de Físicos Afrodescendentes
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <Loader2 className="h-12 w-12 animate-spin text-wfa-500" />
              <p className="text-lg text-gray-600">Processando dados do Excel...</p>
              <p className="text-sm text-gray-500">Isso pode levar alguns segundos</p>
            </div>
          ) : (
            <FileUpload onFileSelect={handleFileSelect} loading={loading} />
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-700 font-medium">Erro ao processar arquivo</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader data={data} />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex space-x-4">
            <Button 
              onClick={handleExportData}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Dados
            </Button>
            <Button 
              onClick={handleResetData}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Carregar Novo Arquivo
            </Button>
          </div>
        </div>

        <FilterControls onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InterestChart data={data.charts.presenceInterest} />
          <EducationChart data={data.charts.educationLevel} />
        </div>

        <InstitutionChart data={data.charts.institutions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EnglishLevelChart data={data.charts.englishLevel} />
          <CareerPathsChart data={data.charts.careerPaths} />
        </div>

        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600">
            Dashboard criado para análise dos dados do I WFA 2025 - Salvador/BA
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total de {data.summary.totalResponses} respostas analisadas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
