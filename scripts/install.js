const fs = require('fs');
const path = require('path');

// Pasta onde os arquivos serão copiados
const publicDir = path.join(process.cwd(), 'public');

// Cria a pasta se não existir
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Lista de arquivos para copiar
const files = [
  ['dist/zyra.min.js', 'zyra.min.js'],
  ['dist/styles/main.css', 'zyra.css']
];

// Copia os arquivos
files.forEach(([src, dest]) => {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(publicDir, dest);
  
  // Copia o arquivo
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copiado: ${dest}`);
}); 