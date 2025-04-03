// server.js
import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
// import i18next from 'i18next';
// import Backend from 'i18next-http-backend';
import DrupalResource from './DrupalResource.js';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do .env

// Configuração do i18next para evitar erro de tradução
// i18next.use(Backend).init({
//   fallbackLng: 'en',
//   debug: false,
//   backend: {
//     loadPath: '/locales/{{lng}}/{{ns}}.json', 
//   },
// });

const admin = new AdminJS({
  resources: [
    {
      resource: new DrupalResource(),
      options: {
        navigation: { name: 'Clubes de Tiro', icon: 'Gun' },
        name: 'Clubes de Tiro',
        properties: {
          nome: { label: 'Nome' },
          descricao: { label: 'Descrição' },
          cidade: { label: 'Cidade' },
          estado: { label: 'Estado' },
          telefone: { label: 'Telefone' },
          email: { label: 'E-mail' },
        },
      },
    },
  ],
  branding: {
    companyName: 'ShootHub',
    softwareBrothers: false, // Remove branding do AdminJS
  },
  // locale: {
  //   translations: {
  //     labels: {
  //       ClubeDeTiro: 'Clubes de Tiro',
  //     },
  //   },
  // },
  rootPath: '/admin',
});

const app = express();
const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);

// Middleware para evitar erro de favicon 404
app.get('/favicon.ico', (req, res) => res.status(204));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AdminJS rodando em http://localhost:${PORT}/admin`));
