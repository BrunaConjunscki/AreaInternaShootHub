import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import ClubesResource from './ClubesResource.js';
import ArmasResource from './ArmasResource.js';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_ADMIN_OPTIONS = {};

const usersNavigation = {
  name: null,
  icon: 'Map',
}
const armasNavigation = {
  name: null,
  icon: 'User',
}
// Configuração do AdminJS
const admin = new AdminJS({
  resources: [
    {
      resource: new ClubesResource(),
      options: {
        id: 'ClubesDeTiro',
        navigation:usersNavigation,
        name: 'Clubes de Tiro',
        icon: 'Map',
        properties: {
          cnpj: {
            isTitle: false,
            position: 1,
            isRequired: true,
            label: 'CNPJ',
            description: 'CNPJ do clube de tiro'
          },
          nome: {
            isTitle: true,
            position: 2,
            isRequired: true,
            label: 'Nome',
            description: 'Nome do clube de tiro'
          },
          descricao: {
            type: 'textarea',
            position: 3,
            label: 'Descrição',
            description: 'Descrição detalhada do clube'
          },
          cidade: {
            position: 4,
            label: 'Cidade',
            description: 'Cidade onde o clube está localizado'
          },
          estado: {
            position: 5,
            label: 'Estado',
            description: 'Estado onde o clube está localizado'
          },
          telefone: {
            position: 6,
            label: 'Telefone',
            description: 'Telefone de contato do clube'
          },
          email: {
            position: 7,
            type: 'email',
            label: 'E-mail',
            description: 'E-mail de contato do clube'
          },
        },
        actions: {
          new: {
            isAccessible: true,
            before: async (request) => {
              // Podemos realizar validações ou transformações aqui antes de criar
              return request;
            },
          },
          edit: {
            isAccessible: true,
          },
          delete: {
            isAccessible: true,
          },
          // Ação personalizada para visualizar mais detalhes
          detalhes: {
            actionType: 'record',
            icon: 'Information',
            label: 'Ver detalhes',
            component: false, // Usará o componente padrão do AdminJS
            handler: async (request, response, context) => {
              const { record, resource } = context;
              return {
                record: record.toJSON(context.currentAdmin),
              };
            },
          },
        },
      },
    },
    {
      resource: new ArmasResource(),
      options: {
        id: 'Armas',
        navigation: armasNavigation,
        name: 'Armas',
        icon: 'Gun',
        properties: {
          nome: {
            isTitle: true,
            position: 1,
            isRequired: true,
            label: 'Nome',
            description: 'Nome da arma'
          }
        },
        actions: {
          new: {
            isAccessible: true,
            before: async (request) => {
              // Podemos realizar validações ou transformações aqui antes de criar
              return request;
            },
          },
          edit: {
            isAccessible: true,
          },
          delete: {
            isAccessible: true,
          },
          detalhes: {
            actionType: 'record',
            icon: 'Information',
            label: 'Ver detalhes',
            component: false, // Usará o componente padrão do AdminJS
            handler: async (request, response, context) => {
              const { record, resource } = context;
              return {
                record: record.toJSON(context.currentAdmin),
              };
            },
          },
          }
        }
      }
  ],
  branding: {
    companyName: 'ShootHub',
    logo: false, // Você pode adicionar um logo customizado aqui
    softwareBrothers: false, // Remove branding do AdminJS
    favicon: false, // Você pode adicionar seu favicon aqui
  },
  locale: {
    language: 'en', // Mudando de pt-BR para en (padrão suportado)
    translations: {
      labels: {
        ClubesResource: 'Clubes de Tiro',
        'Clubes de Tiro': 'Clubes de Tiro',
        'ClubesDeTiro': 'Clubes de Tiro',
        'Clubes De Tiro': 'Clubes de Tiro',
      },
      messages: {
        successfullyCreated: 'Registro criado com sucesso',
        successfullyUpdated: 'Registro atualizado com sucesso',
        successfullyDeleted: 'Registro excluído com sucesso',
        thereAreValidationErrors: 'Existem erros de validação - verifique os dados',
      },
      buttons: {
        save: 'Salvar',
        addNewItem: 'Adicionar Novo Item',
        filter: 'Filtrar',
        applyChanges: 'Aplicar alterações',
        resetFilter: 'Limpar',
        confirmRemovalMany: 'Confirmar a remoção de {{count}} registros',
        confirmRemovalMany_plural: 'Confirmar a remoção de {{count}} registros',
        logout: 'Sair',
        login: 'Entrar',
        seeTheDocumentation: 'Ver: <1>documentação</1>',
        createFirstRecord: 'Criar Primeiro Registro',
      },
      resources: {
        Clubes_de_Tiro: {
          actions: {
            new: 'Adicionar Clube de Tiro',
            edit: 'Editar Clube de Tiro',
            show: 'Visualizar Clube de Tiro',
            delete: 'Excluir Clube de Tiro',
            detalhes: 'Ver detalhes do Clube de Tiro',
            list: 'Lista de Clubes de Tiro',
          },
          properties: {
            cnpj: 'CNPJ',
            nome: 'Nome',
            descricao: 'Descrição',
            cidade: 'Cidade',
            estado: 'Estado',
            telefone: 'Telefone',
            email: 'E-mail',
          },
        },
        ClubesDeTiro: {
          actions: {
            new: 'Adicionar Clube de Tiro',
            edit: 'Editar Clube de Tiro',
            show: 'Visualizar Clube de Tiro',
            delete: 'Excluir Clube de Tiro',
            detalhes: 'Ver detalhes do Clube de Tiro',
            list: 'Lista de Clubes de Tiro',
          },
          properties: {
            cnpj: 'CNPJ',
            nome: 'Nome',
            descricao: 'Descrição',
            cidade: 'Cidade',
            estado: 'Estado',
            telefone: 'Telefone',
            email: 'E-mail',
          },
        },
      },
    },
  },

  // Removendo a dashboard personalizada que estava causando erro
  // dashboard: {
  //   component: AdminJS.bundle('./dashboard'),
  //   handler: async () => {
  //     return {
  //       appName: 'ShootHub',
  //       version: '1.0.0'
  //     };
  //   },
  // },
  rootPath: '/admin',
});

// Inicializa a aplicação Express
const app = express();

// Inicializa o router do AdminJS
const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);

// Middleware para evitar erro de favicon 404
app.get('/favicon.ico', (req, res) => res.status(204));

// Adiciona middleware para parsear JSON e urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AdminJS rodando em http://localhost:${PORT}/admin`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'desenvolvimento'}`);
  console.log(`API Drupal: ${process.env.DRUPAL_API_URL}`);
});
