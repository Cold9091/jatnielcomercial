// vercel-entry.js
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from 'express';
import { registerRoutes } from './server/routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware para logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Registrar rotas da API
const server = await registerRoutes(app);

// Middleware de tratamento de erros
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Servir arquivos estáticos
const staticPath = resolve(__dirname, 'dist/public');
app.use(express.static(staticPath));

// Rota padrão para servir o arquivo index.html
app.get('*', (req, res) => {
  res.sendFile(resolve(staticPath, 'index.html'));
});

// Exportar para uso com serverless
export default app;
