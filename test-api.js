import axios from 'axios';
import dotenv from 'dotenv';

// Carrega variáveis do .env
dotenv.config();

// Função para testar a conexão com a API
async function testarConexaoAPI() {
  console.log('Testando conexão com a API Drupal...');
  console.log(`URL da API: ${process.env.DRUPAL_API_URL}`);

  try {
    const response = await axios.get(`${process.env.DRUPAL_API_URL}/api/clube-de-tiro?_format=json`, {
      headers: {
        Authorization: `Basic ${process.env.DRUPAL_AUTH}`,
      },
      timeout: 5000, // 5 segundos de timeout
    });

    console.log('Conexão com API bem-sucedida! ✅');
    console.log(`Total de registros encontrados: ${response.data.length}`);

    if (response.data.length > 0) {
      console.log('\nPrimeiro registro:');
      console.log(JSON.stringify(response.data[0], null, 2));
    } else {
      console.log('\nNenhum registro encontrado na API.');
    }

    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com a API:');

    if (error.response) {
      // A requisição foi feita e o servidor respondeu com status diferente de 2xx
      console.error(`Status: ${error.response.status}`);
      console.error(`Mensagem: ${error.response.statusText}`);
      console.error('Resposta:', error.response.data);
    } else if (error.request) {
      // A requisição foi feita, mas não recebeu resposta
      console.error('Sem resposta do servidor. Verifique a URL e a conexão de rede.');
    } else {
      // Erro na configuração da requisição
      console.error(`Mensagem: ${error.message}`);
    }

    console.log('\nSugestões para corrigir:');
    console.log('1. Verifique se a URL da API está correta no arquivo .env');
    console.log('2. Verifique se as credenciais de autenticação estão corretas');
    console.log('3. Verifique se o servidor da API está online e acessível');
    console.log('4. Verifique se a estrutura da API corresponde ao esperado pelo DrupalResource.js');

    return false;
  }
}

// Executa o teste e termina o processo com o código adequado
testarConexaoAPI()
  .then(result => {
    process.exit(result ? 0 : 1);
  })
  .catch(error => {
    console.error('Erro não tratado:', error);
    process.exit(1);
  });
