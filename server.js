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
  icon: 'Target',
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
        icon: 'Users',
        properties: {
          uuid: { isVisible:false ,isId: true, position: 1, label: 'UUID', description: 'Identificador único da arma' },
          nome: { isRequired: true, isTitle: true, position: 2, label: 'Nome', description: 'Nome da arma' },
          modelo: {isRequired: true, position: 3, label: 'Modelo', description: 'Modelo da arma' },
          codigo: { isRequired: true,position: 4, label: 'Código', description: 'Código da arma' },
          descricao: { type: 'textarea', position: 5, label: 'Descrição', description: 'Descrição detalhada' },
          fabricante: { isRequired: true,position: 6, label: 'Fabricante', description: 'Nome do fabricante' },
          id_fabricante: { isVisible: false,position: 7, label: 'ID do Fabricante', description: 'Identificador do fabricante' },
          calibre: { isRequired: true,position: 8, label: 'Calibre', description: 'Calibre da arma' },
          capacidade: { isRequired: true,position: 9, label: 'Capacidade', description: 'Capacidade do carregador' },
          acabamentos: { position: 10, label: 'Acabamentos', description: 'Tipo de acabamento da arma' },
          altura_total: { position: 11, label: 'Altura Total', description: 'Altura total da arma (mm)' },
          comprimento_total: { position: 12, label: 'Comprimento Total', description: 'Comprimento total (mm)' },
          comprimento_cano: { position: 13, label: 'Comprimento do Cano', description: 'Comprimento do cano (mm)' },
          largura: { position: 14, label: 'Largura', description: 'Largura da arma (mm)' },
          peso_carregador_vazio: { position: 15, label: 'Peso c/ Carregador Vazio', description: 'Peso da arma com carregador vazio (g)' },
          peso_gatilho: { position: 16, label: 'Peso do Gatilho', description: 'Força necessária no gatilho (g)' },
          acao: { position: 17, label: 'Ação', description: 'Tipo de ação da arma' },
          funcionamento: { isRequired: true,position: 18, label: 'Funcionamento', description: 'Funcionamento da arma (ex: semi-automático)' },
          sistema_de_recarga: { position: 19, label: 'Sistema de Recarga', description: 'Tipo de sistema de recarga' },
          tipo_arma: { isRequired: true,position: 20, label: 'Tipo de Arma', description: 'Categoria da arma (ex: pistola, fuzil)' },
          mobilidade: { position: 21, label: 'Mobilidade', description: 'Mobilidade da arma' },
          emprego: { position: 22, label: 'Emprego', description: 'Finalidade da arma (ex: defesa, esporte)' },
          energia: { position: 23, label: 'Energia', description: 'Energia de disparo da arma' },
          material: { position: 24, label: 'Material', description: 'Material de fabricação da arma' },
          tipo_mira: { position: 25, label: 'Tipo de Mira', description: 'Tipo de mira da arma' },
          distancia_entre_miras: { position: 26, label: 'Distância entre Miras', description: 'Distância entre os pontos de mira (mm)' },
          numero_raias: { position: 27, label: 'Número de Raias', description: 'Número de raias no cano' },
          sentido_raia: { position: 28, label: 'Sentido da Raia', description: 'Sentido de rotação das raias (ex: horário)' },
          refrigeracao: { position: 29, label: 'Refrigeração', description: 'Tipo de refrigeração (ex: ar, água)' },
          ambdestra: { position: 30, label: 'Ambidestra', description: 'Se é adaptada para destros e canhotos' },
          desarme_cao: { position: 31, label: 'Desarme do Cão', description: 'Possui mecanismo de desarme do cão?' },
          indicador_municao_camara: { position: 32, label: 'Indicador de Munição', description: 'Indicador de munição na câmara' },
          retem_carregador_bidestro: { position: 33, label: 'Retém Bidestro', description: 'Retém de carregador para destros e canhotos' },
          trava_percursor: { position: 34, label: 'Trava do Percursor', description: 'Possui trava do percursor' },
          trilho_picadily: { position: 35, label: 'Trilho Picatinny', description: 'Possui trilho para acessórios (Picatinny)' },
          nid: { position: 36, label: 'NID', description: 'Número de Identificação do Dispositivo' },
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
        Armas: {
          actions: {
            new: 'Adicionar Arma',
            edit: 'Editar Arma',
            show: 'Visualizar Arma',
            delete: 'Excluir Arma',
            list: 'Lista de Armas',
          },
          properties: {
            uuid: 'ID',
            nome: 'Nome',
            modelo: 'Modelo',
            fabricante: 'Fabricante',
            calibre: 'Calibre',
            capacidade: 'Capacidade',
            tipo_arma: 'Tipo de Arma',
            funcionamento: 'Funcionamento',
            codigo: 'Código',
            descricao: 'Descrição',
            id_fabricante: 'ID do Fabricante',
            acabamentos: 'Acabamentos',
            altura_total: 'Altura Total',
            comprimento_total: 'Comprimento Total',
            comprimento_cano: 'Comprimento do Cano',
            largura: 'Largura',
            peso_carregador_vazio: 'Peso com Carregador Vazio',
            peso_gatilho: 'Peso do Gatilho',
            acao: 'Ação',
            sistema_de_recarga: 'Sistema de Recarga',
            mobilidade: 'Mobilidade',
            emprego: 'Emprego',
            energia: 'Energia',
            material: 'Material',
            tipo_mira: 'Tipo de Mira',
            distancia_entre_miras: 'Distância entre Miras',
            numero_raias: 'Número de Raias',
            sentido_raia: 'Sentido da Raia',
            refrigeracao: 'Refrigeração',
            ambdestra: 'Ambidestra',
            desarme_cao: 'Desarme do Cão',
            indicador_municao_camara: 'Indicador de Munição na Câmara',
            retem_carregador_bidestro: 'Retém do Carregador Bidestro',
            trava_percursor: 'Trava do Percursor',
            trilho_picadily: 'Trilho Picatinny',
            nid: 'NID',
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
