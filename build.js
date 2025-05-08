// build.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Criar diretórios necessários
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(distDir, 'public');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Build do cliente
console.log('Building client...');
try {
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Client build completed successfully!');
} catch (error) {
  console.error('Error building client:', error);
  process.exit(1);
}

// Build do servidor
console.log('Building server...');
try {
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  console.log('Server build completed successfully!');
} catch (error) {
  console.error('Error building server:', error);
  process.exit(1);
}

console.log('Full build completed successfully!');
