# AreaInternaShootHub

Área interna para gerenciamento dos dados do ShootHub, um sistema para clubes de tiro.

## Requisitos

- Node.js (versão recomendada: 18.x ou superior)
- npm (incluído com o Node.js)

## Instalação

1. Clone o repositório:
```
git clone [URL_DO_REPOSITÓRIO]
cd AreaInternaShootHub
```

2. Instale as dependências:
```
npm install
```

## Executando o projeto

### Modo de produção

Para executar o projeto em modo de produção:

```
npm start
```

### Modo de desenvolvimento com Hot Reload

Para executar o projeto em modo de desenvolvimento com hot reload (reinicia automaticamente quando há alterações no código):

```
npm run dev
```

Com o hot reload ativado, o servidor será reiniciado automaticamente sempre que você salvar alterações nos seguintes arquivos:
- server.js
- DrupalResource.js
- .env
- Qualquer arquivo com extensão .js, .json ou .env

## Acesso ao painel de administração

Após iniciar o servidor, acesse o painel de administração em:

```
http://localhost:3000/admin
```

## Configuração

As configurações do projeto são gerenciadas através do arquivo `.env` na raiz do projeto.

## Estrutura do projeto

- `server.js` - Ponto de entrada da aplicação
- `DrupalResource.js` - Configuração de recursos do Drupal
- `nodemon.json` - Configuração do hot reload para desenvolvimento

## Desenvolvimento

### Hot Reload

O projeto está configurado com nodemon para fornecer hot reload durante o desenvolvimento. Isso significa que o servidor reiniciará automaticamente quando você fizer alterações nos arquivos monitorados.

Para modificar quais arquivos são monitorados, edite o arquivo `nodemon.json`.
