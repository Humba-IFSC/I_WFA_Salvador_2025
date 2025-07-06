
import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';

export interface WFADataRow {
  carimbo_data_hora: string;
  endereco_email: string;
  pergunta_01_presenca_evento: string;
  pergunta_02_nivel_formacao: string;
  pergunta_03_relacao_fisica: string;
  pergunta_04_afiliacao: string;
  pergunta_05_expectativas_workshop: string;
  pergunta_06_temas_workshop: string;
  pergunta_07_caminhos_pos_graduacao: string;
  pergunta_08_outra_carreira: string;
  pergunta_09_oportunidades_trabalho: string;
  pergunta_10_destaque_mercado: string;
  pergunta_11_empreender_fisica: string;
  pergunta_12_areas_interesse: string;
  pergunta_13_outra_area_interesse: string;
  pergunta_14_exemplos_negocios_inovadores: string;
  pergunta_15_suporte_empreender: string;
  pergunta_16_acesso_estudantes_negros: string;
  pergunta_17_desafios_cotas: string;
  pergunta_18_apoio_permanencia: string;
  pergunta_19_impedimentos_participacao: string;
  pergunta_20_outras_dificuldades: string;
  pergunta_21_facilitadores_participacao: string;
  pergunta_22_nivel_ingles: string;
}

export interface ProcessedData {
  raw: WFADataRow[];
  summary: {
    totalResponses: number;
    dateRange: { start: string; end: string };
    uniqueEmails: number;
  };
  charts: {
    presenceInterest: { name: string; value: number; percentage: number }[];
    educationLevel: { name: string; value: number; percentage: number }[];
    institutions: { name: string; value: number; percentage: number }[];
    englishLevel: { name: string; value: number; percentage: number }[];
    careerPaths: { name: string; value: number; percentage: number }[];
  };
}

export const useDataProcessor = () => {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      console.log('Raw Excel data:', jsonData);

      // Convert and map data to our interface
      const rawData: WFADataRow[] = jsonData.map(row => ({
        carimbo_data_hora: row['Carimbo de data/hora'] || '',
        endereco_email: row['Endereço de e-mail'] || '',
        pergunta_01_presenca_evento: row['1. Você iria ao evento?'] || '',
        pergunta_02_nivel_formacao: row['2. Qual o seu nível de formação e atuação?\n(Marque a opção que melhor representa)'] || '',
        pergunta_03_relacao_fisica: row['3. Com relação às opções da pergunta 2.\nSe você é um profissional que tem envolvimento com a área de Física (opções - Profissional atuando em área relacionada à Física ou Outro) ou não foi contemplado nas opções anteriores, conte-nos, brevemente, como é essa relação!'] || '',
        pergunta_04_afiliacao: row['4. Qual é a sua afiliação (sua instituição atual)?'] || '',
        pergunta_05_expectativas_workshop: row['5. O que você espera conversar no Workshop?\n\na. Quais temas te interessam mais?\nb. Quais temas você gostaria de discutir com outros físicos negros?\nc. Que tipo de debates te motivariam a participar?\n\n- Fique à vontade para sugerir, apreciaríamos contribuições!'] || '',
        pergunta_06_temas_workshop: row['6. Quais temas serão abordados no Workshop?\n\na. Quais áreas da Física você gostaria que fossem abordadas?\nb. Gostaria de discutir desafios e oportunidades para físicos negros na academia?\nc. Tem interesse em temas como representatividade, mentoria e redes de apoio?'] || '',
        pergunta_07_caminhos_pos_graduacao: row['7. Depois da graduação: quais caminhos posso seguir na Física além da carreira acadêmica?'] || '',
        pergunta_08_outra_carreira: row['8. Se você optou por outra carreira, comente qual é campo de atuação?'] || '',
        pergunta_09_oportunidades_trabalho: row['9. Quais as áreas de atuação e oportunidades de trabalho para físicos?'] || '',
        pergunta_10_destaque_mercado: row['10. Como físicos negros podem se destacar no mercado de trabalho?'] || '',
        pergunta_11_empreender_fisica: row['11. Empreender na área de Física: É possível?'] || '',
        pergunta_12_areas_interesse: row['12. Quais áreas de atuação te interessam mais?'] || '',
        pergunta_13_outra_area_interesse: row['13. Se você optou por outra área no item anterior, conte-nos mais e descreva de forma breve essa área de interesse. (Responda mesmo se tenha feito uma opção anterior, mas tem outra área de interesse não listada.)'] || '',
        pergunta_14_exemplos_negocios_inovadores: row['14. Conhece exemplos de negócios inovadores criados por físicos? Conte-nos um pouco.'] || '',
        pergunta_15_suporte_empreender: row['15. Que tipo de suporte você gostaria de ter para empreender na área?'] || '',
        pergunta_16_acesso_estudantes_negros: row['16. Como podemos ampliar o acesso de estudantes negros aos cursos de Física?'] || '',
        pergunta_17_desafios_cotas: row['17. Quais os desafios e as conquistas das políticas de cotas no acesso à Física?'] || '',
        pergunta_18_apoio_permanencia: row['18. Que tipo de apoio você considera fundamental para estudantes negros ingressarem e permanecerem na Física?'] || '',
        pergunta_19_impedimentos_participacao: row['19. Quais fatores poderiam te impedir de participar do workshop?'] || '',
        pergunta_20_outras_dificuldades: row['20. Caso vocẽ tenha mencionado outras dificuldades, indique para nós quais são esses fatores.'] || '',
        pergunta_21_facilitadores_participacao: row['21. Pensando na sua participação, há algo que possamos facilitar para você?'] || '',
        pergunta_22_nivel_ingles: row['22. Finalizando esse questionário, gostaríamos de saber qual é o nível de conhecimento da língua inglesa quanto à conversação?\n\nObservação: \nAs opções de resposta são baseadas no Quadro Comum Europeu de Referência para Línguas (CEFR). Ele é um padrão internacional para descrever habilidades linguísticas. CEFR Language'] || ''
      }));

      console.log('Processed raw data:', rawData);

      // Process data for charts
      const processedData = processDataForCharts(rawData);
      setData(processedData);

    } catch (err) {
      console.error('Error processing file:', err);
      setError('Erro ao processar o arquivo. Verifique se é um arquivo Excel válido.');
    } finally {
      setLoading(false);
    }
  }, []);

  const processDataForCharts = (rawData: WFADataRow[]): ProcessedData => {
    const totalResponses = rawData.length;
    
    // Get date range
    const dates = rawData
      .map(row => row.carimbo_data_hora)
      .filter(date => date)
      .sort();
    
    const dateRange = {
      start: dates[0] || '',
      end: dates[dates.length - 1] || ''
    };

    // Get unique emails
    const uniqueEmails = new Set(rawData.map(row => row.endereco_email).filter(email => email)).size;

    // Process presence interest
    const presenceCount = countResponses(rawData, 'pergunta_01_presenca_evento');
    const presenceInterest = Object.entries(presenceCount).map(([name, value]) => ({
      name: name || 'Não informado',
      value,
      percentage: Math.round((value / totalResponses) * 100)
    }));

    // Process education level
    const educationCount = countResponses(rawData, 'pergunta_02_nivel_formacao');
    const educationLevel = Object.entries(educationCount).map(([name, value]) => ({
      name: truncateText(name || 'Não informado', 30),
      value,
      percentage: Math.round((value / totalResponses) * 100)
    }));

    // Process institutions (top 10)
    const institutionCount = countResponses(rawData, 'pergunta_04_afiliacao');
    const topInstitutions = Object.entries(institutionCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    const institutions = topInstitutions.map(([name, value]) => ({
      name: truncateText(name || 'Não informado', 25),
      value,
      percentage: Math.round((value / totalResponses) * 100)
    }));

    // Process English level
    const englishCount = countResponses(rawData, 'pergunta_22_nivel_ingles');
    const englishLevel = Object.entries(englishCount).map(([name, value]) => ({
      name: truncateText(name || 'Não informado', 20),
      value,
      percentage: Math.round((value / totalResponses) * 100)
    }));

    // Process career paths/areas of interest
    const careerCount = countResponses(rawData, 'pergunta_12_areas_interesse');
    const careerPaths = Object.entries(careerCount).map(([name, value]) => ({
      name: truncateText(name || 'Não informado', 25),
      value,
      percentage: Math.round((value / totalResponses) * 100)
    }));

    return {
      raw: rawData,
      summary: {
        totalResponses,
        dateRange,
        uniqueEmails
      },
      charts: {
        presenceInterest,
        educationLevel,
        institutions,
        englishLevel,
        careerPaths
      }
    };
  };

  const countResponses = (data: WFADataRow[], field: keyof WFADataRow): Record<string, number> => {
    const counts: Record<string, number> = {};
    
    data.forEach(row => {
      const value = row[field];
      if (value && value.trim() !== '') {
        // Handle multiple options separated by commas or semicolons
        const options = value.split(/[,;]/).map(opt => opt.trim()).filter(opt => opt !== '');
        
        if (options.length > 1) {
          options.forEach(option => {
            counts[option] = (counts[option] || 0) + 1;
          });
        } else {
          counts[value] = (counts[value] || 0) + 1;
        }
      }
    });
    
    return counts;
  };

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return {
    data,
    loading,
    error,
    processFile
  };
};
