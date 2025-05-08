// api/index.js
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir arquivos estáticos da pasta dist/public
const staticPath = resolve(__dirname, '../dist/public');
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
} else {
  console.warn(`Diretório estático não encontrado: ${staticPath}`);
}

// Rota padrão para servir o arquivo index.html
app.get('*', (req, res) => {
  const indexPath = resolve(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Aplicação não encontrada. Certifique-se de que o build foi realizado corretamente.');
  }
});

// Criar servidor HTTP
const server = createServer(app);
const port = process.env.PORT || 3000;

// Iniciar o servidor
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exportar para uso com serverless
export default app;
