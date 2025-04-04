#!/bin/bash

# Cores para saída no terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # Sem cor

# Função para iniciar o servidor
start_server() {
  echo -e "${GREEN}Iniciando servidor...${NC}"
  node server.js &
  SERVER_PID=$!
  echo -e "${YELLOW}Servidor iniciado com PID: $SERVER_PID${NC}"
}

# Função para matar o servidor atual
kill_server() {
  if [ ! -z "$SERVER_PID" ]; then
    echo -e "${RED}Parando servidor com PID: $SERVER_PID${NC}"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null
  fi
}

# Função para reiniciar o servidor
restart_server() {
  echo -e "${YELLOW}Alterações detectadas. Reiniciando servidor...${NC}"
  kill_server
  start_server
}

# Captura Ctrl+C para sair limpo
trap 'echo -e "${RED}Encerrando...${NC}"; kill_server; exit 0' INT

# Inicia servidor pela primeira vez
start_server

# Arquivos para monitorar
FILES_TO_WATCH="server.js DrupalResource.js .env"

echo -e "${BLUE}Monitorando arquivos para alterações...${NC}"
echo -e "${GREEN}Pressione Ctrl+C para encerrar.${NC}"

# Loop principal de monitoramento
while true; do
  for file in $FILES_TO_WATCH; do
    if [ -e "$file" ]; then
      CURRENT_HASH=$(md5sum "$file")
      if [ -z "${LAST_HASH[$file]}" ]; then
        # Armazenar hash inicial
        LAST_HASH[$file]=$CURRENT_HASH
      elif [ "${LAST_HASH[$file]}" != "$CURRENT_HASH" ]; then
        # Hash diferente, arquivo foi modificado
        echo -e "${YELLOW}Arquivo modificado: $file${NC}"
        LAST_HASH[$file]=$CURRENT_HASH
        restart_server
        break
      fi
    fi
  done
  # Espera um pouco antes de verificar novamente
  sleep 1
done
