const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../resources/swagger.json');

const app = express();
// Permitir somente o front local por segurança em dev
app.use(cors({
  origin: 'http://localhost:4000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Opcional: responder preflight para todas as rotas
app.options('*', cors());

app.use(express.json());

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
