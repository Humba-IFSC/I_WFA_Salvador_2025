
import { useCallback } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  loading?: boolean;
}

export const FileUpload = ({ onFileSelect, loading }: FileUploadProps) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        onFileSelect(file);
      } else {
        alert('Por favor, selecione um arquivo Excel (.xlsx ou .xls)');
      }
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        onFileSelect(file);
      } else {
        alert('Por favor, selecione um arquivo Excel (.xlsx ou .xls)');
      }
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <Card className="glass-card p-8">
      <div
        className="border-2 border-dashed border-wfa-300 rounded-xl p-12 text-center transition-all hover:border-wfa-400 hover:bg-wfa-50/50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-gradient-to-br from-wfa-100 to-salvador-100 rounded-full">
            <FileSpreadsheet className="h-12 w-12 text-wfa-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold gradient-text">
              Carregar Dados do I WFA 2025
            </h3>
            <p className="text-gray-600 max-w-md">
              Arraste e solte seu arquivo Excel aqui ou clique para selecionar
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label htmlFor="file-upload">
              <Button 
                className="bg-gradient-to-r from-wfa-500 to-salvador-500 hover:from-wfa-600 hover:to-salvador-600 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all transform hover:scale-105 shadow-lg"
                disabled={loading}
                asChild
              >
                <span className="cursor-pointer flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>{loading ? 'Processando...' : 'Selecionar Arquivo'}</span>
                </span>
              </Button>
            </label>
          </div>

          <p className="text-sm text-gray-500">
            Formatos suportados: .xlsx, .xls
          </p>
        </div>
      </div>
    </Card>
  );
};
