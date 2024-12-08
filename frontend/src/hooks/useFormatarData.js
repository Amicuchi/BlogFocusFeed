import { useMemo } from 'react';

// Função para formatar data
export function useFormatarData(dataOriginal) {
  const dataFormatada = useMemo(() => {
    if (!dataOriginal) return '';
    
    const data = new Date(dataOriginal);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }, [dataOriginal]);

  return dataFormatada;
};