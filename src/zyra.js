// Core
import { createApp } from './core';

// Components
import { createButton } from './components/Button';

// Utils
import { formatters } from './utils/formatters';

// Cria o objeto global Zyra
const Zyra = {
  createApp,
  createButton,
  formatters,
  
  // Você pode adicionar mais exports aqui
  version: '1.0.0'
};

// Export para uso com módulos
export default Zyra;

// Export para uso no browser
if (typeof window !== 'undefined') {
  window.Zyra = Zyra;
} 