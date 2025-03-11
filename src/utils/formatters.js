export const formatters = {
  // Formata moeda
  currency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },
  
  // Formata data
  date(value, format = 'dd/MM/yyyy') {
    const date = new Date(value);
    return format
      .replace('dd', String(date.getDate()).padStart(2, '0'))
      .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
      .replace('yyyy', date.getFullYear());
  },
  
  // Limita texto
  truncate(text, length = 50) {
    return text.length > length 
      ? text.substring(0, length) + '...' 
      : text;
  }
}; 