import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import DrupalResource from './DrupalResource.js';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do .env

const admin = new AdminJS({
  resources: [
    {
      resource: new DrupalResource(),
      options: {
        navigation: { name: 'Armas', icon: 'Gun' },
      },
    },
  ],
  rootPath: '/admin',
});

const app = express();
const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AdminJS rodando em http://localhost:${PORT}/admin`));
