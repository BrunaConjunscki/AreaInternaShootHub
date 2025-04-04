#!/bin/bash

# Cores para saída no terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # Sem cor

echo -e "${BLUE}Iniciando ambiente de desenvolvimento ShootHub...${NC}"

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js não encontrado. Por favor, instale o Node.js:${NC}"
    echo -e "sudo apt update && sudo apt install nodejs npm"
    exit 1
fi

# Verifica se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm não encontrado. Por favor, instale o npm:${NC}"
    echo -e "sudo apt install npm"
    exit 1
fi

# Obtém a versão do Node.js
NODE_VERSION=$(node -v)
echo -e "${GREEN}Usando Node.js versão: ${NODE_VERSION}${NC}"

# Verifica se node_modules existe, caso contrário, instala as dependências
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Pasta node_modules não encontrada. Instalando dependências...${NC}"
    npm install

    if [ $? -ne 0 ]; then
        echo -e "${RED}Falha ao instalar dependências. Verifique os erros acima.${NC}"
        exit 1
    fi

    echo -e "${GREEN}Dependências instaladas com sucesso!${NC}"
else
    echo -e "${GREEN}Dependências já instaladas.${NC}"
fi

# Verifica se o nodemon está instalado
if ! npm list -g nodemon &> /dev/null && ! npm list nodemon &> /dev/null; then
    echo -e "${YELLOW}nodemon não encontrado. Instalando localmente...${NC}"
    npm install --save-dev nodemon

    if [ $? -ne 0 ]; then
        echo -e "${RED}Falha ao instalar nodemon. Verifique os erros acima.${NC}"
        exit 1
    fi

    echo -e "${GREEN}nodemon instalado com sucesso!${NC}"
else
    echo -e "${GREEN}nodemon já instalado.${NC}"
fi

# Testar conexão com a API Drupal antes de iniciar o servidor
echo -e "${BLUE}Testando conexão com a API Drupal...${NC}"
node test-api.js
API_TEST_STATUS=$?

if [ $API_TEST_STATUS -ne 0 ]; then
    echo -e "${YELLOW}Atenção: Teste de API falhou. Deseja continuar mesmo assim? (s/n)${NC}"
    read -r continue_choice
    if [[ ! "$continue_choice" =~ ^[Ss]$ ]]; then
        echo -e "${RED}Desenvolvimento cancelado. Verifique sua conexão com a API.${NC}"
        exit 1
    fi
    echo -e "${YELLOW}Continuando mesmo com falha no teste de API...${NC}"
else
    echo -e "${GREEN}Teste de API bem-sucedido!${NC}"
fi

# Inicia o servidor no modo de desenvolvimento
echo -e "${BLUE}Iniciando servidor no modo de desenvolvimento com hot reload...${NC}"
echo -e "${GREEN}O servidor será reiniciado automaticamente quando houver alterações nos arquivos.${NC}"
echo -e "${YELLOW}Acesse o painel de administração em: http://localhost:3000/admin${NC}"
echo -e "${RED}Pressione Ctrl+C para parar o servidor.${NC}"

npm run dev
