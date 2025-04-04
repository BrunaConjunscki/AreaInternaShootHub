import React from 'react';
import { Box, H2, H4, Text, Illustration } from '@adminjs/design-system';

const Dashboard = () => {
  return (
    <Box variant="grey">
      <Box variant="white" style={{ padding: '20px' }}>
        <Box
          position="relative"
          overflow="hidden"
          style={{
            padding: '40px 20px',
            background: 'linear-gradient(to right, #003366, #004080)',
            color: 'white',
            borderRadius: '10px',
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          <H2>Bem-vindo ao Sistema de Administração do ShootHub</H2>
          <Text style={{ marginTop: '10px', fontSize: '16px' }}>
            Use o menu lateral para gerenciar os clubes de tiro cadastrados.
          </Text>
        </Box>

        <Box style={{ marginTop: '20px' }}>
          <H4>Funções Disponíveis:</H4>
          <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
            <Box
              style={{
                flex: '1 1 300px',
                padding: '20px',
                border: '1px solid #eee',
                borderRadius: '10px',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>
                Gerenciamento de Clubes de Tiro
              </Box>
              <Text>
                Visualize, adicione, edite e remova clubes de tiro na plataforma ShootHub.
              </Text>
            </Box>

            <Box
              style={{
                flex: '1 1 300px',
                padding: '20px',
                border: '1px solid #eee',
                borderRadius: '10px',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '16px' }}>
                Consulta de Informações
              </Box>
              <Text>
                Acesse informações detalhadas de cada clube e edite suas propriedades conforme necessário.
              </Text>
            </Box>
          </Box>
        </Box>

        <Box style={{ marginTop: '40px', textAlign: 'center', color: '#666' }}>
          <Text>ShootHub - Plataforma de Gerenciamento de Clubes de Tiro</Text>
          <Text size="sm">© {new Date().getFullYear()} ShootHub - Todos os direitos reservados</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
