import axios from 'axios';
import { BaseResource, BaseRecord, BaseProperty } from 'adminjs';

class ArmasResource extends BaseResource {
  constructor() {
    super();
    this.apiUrl = process.env.DRUPAL_API_URL;
    this.authHeader = {
      Authorization: `Basic ${process.env.DRUPAL_AUTH}`,
    };
  }

  id(record) {
    return record?.uuid || record?.id || null;
  }

  static get name() {
    return 'Armas';
  }

  properties() {
    return [
      new BaseProperty({ path: 'uuid', isId: true, type: 'string' }),
      new BaseProperty({ path: 'nome', isTitle: true, type: 'string' }),
      new BaseProperty({ path: 'modelo', type: 'string' }),
      new BaseProperty({ path: 'fabricante', type: 'string' }),
      new BaseProperty({ path: 'calibre', type: 'string' }),
      new BaseProperty({ path: 'capacidade', type: 'string' }),
      new BaseProperty({ path: 'tipo_arma', type: 'string' }),
      new BaseProperty({ path: 'funcionamento', type: 'string' }),
      new BaseProperty({ path: 'codigo', type: 'string' }),
      new BaseProperty({ path: 'descricao', type: 'textarea' }),      
      new BaseProperty({ path: 'id_fabricante', type: 'string' }),    
      new BaseProperty({ path: 'acabamentos', type: 'string' }),
      new BaseProperty({ path: 'altura_total', type: 'string' }),
      new BaseProperty({ path: 'comprimento_total', type: 'string' }),
      new BaseProperty({ path: 'comprimento_cano', type: 'string' }), // parece ser "comprimento_cano"
      new BaseProperty({ path: 'largura', type: 'string' }),
      new BaseProperty({ path: 'peso_carregador_vazio', type: 'string' }),
      new BaseProperty({ path: 'peso_gatilho', type: 'string' }),
      new BaseProperty({ path: 'acao', type: 'string' }),     
      new BaseProperty({ path: 'sistema_de_recarga', type: 'string' }),     
      new BaseProperty({ path: 'mobilidade', type: 'string' }),
      new BaseProperty({ path: 'emprego', type: 'string' }),
      new BaseProperty({ path: 'energia', type: 'string' }),
      new BaseProperty({ path: 'material', type: 'string' }),
      new BaseProperty({ path: 'tipo_mira', type: 'string' }),
      new BaseProperty({ path: 'distancia_entre_miras', type: 'string' }),
      new BaseProperty({ path: 'numero_raias', type: 'string' }),
      new BaseProperty({ path: 'sentido_raia', type: 'string' }),
      new BaseProperty({ path: 'refrigeracao', type: 'string' }),
      new BaseProperty({ path: 'ambdestra', type: 'string' }),
      new BaseProperty({ path: 'desarme_cao', type: 'string' }),
      new BaseProperty({ path: 'indicador_municao_camara', type: 'string' }),
      new BaseProperty({ path: 'retem_carregador_bidestro', type: 'string' }),
      new BaseProperty({ path: 'trava_percursor', type: 'string' }),
      new BaseProperty({ path: 'trilho_picadily', type: 'string' }),
      // new BaseProperty({ path: 'nid', type: 'string' }),
    ];
  }
  
  //LISTA VARIOS REGISTROS
  async find(query = {}) {
    try {
      const { limit = 10, offset = 0, ...filterQuery } = query;

      const response = await axios.get(`${this.apiUrl}/api/arma/list?_format=json`, {
        headers: this.authHeader,
      });

      // Log para debug
      console.log(`Encontradas ${response.data.length} armas`);

      // Transformando para o formato esperado pelo AdminJS
      const records = response.data.map(item => new BaseRecord(item, this));

      // Aplicar paginação local se a API não suportar
      const startIndex = parseInt(offset, 10) || 0;
      const endIndex = startIndex + (parseInt(limit, 10) || 10);
      const paginatedRecords = records.slice(startIndex, endIndex);

      return paginatedRecords;
    } catch (error) {
      console.error('Erro ao buscar dados:', error.message);
      console.error('Detalhes do erro:', error.response?.data || error);
      return [];
    }
  }

  //CONTA QUANTOS ITENS EXISTEM NA API E RETORNA O TOTAL
  async count(query = {}) {
    try {
      const response = await axios.get(`${this.apiUrl}/api/arma/list?_format=json`, {
        headers: this.authHeader,
      });
      return response.data.length;
    } catch (error) {
      console.error('Erro ao contar registros:', error.message);
      return 0;
    }
  }

  //BUSCA UM ITEM ESPECIFICO PELO ID
  async findOne(uuid) {
    try {
      console.log(`Buscando arma com ID/UUID: ${uuid}`);
      const response = await axios.get(`${this.apiUrl}/api/arma/${uuid}?_format=json`, {
        headers: this.authHeader,
      });
      return new BaseRecord(response.data, this);
    } catch (error) {
      console.error(`Erro ao buscar registro com ID ${uuid}:`, error.message);
      return null;
    }
  }

  //ENVIA UMA REQUISICAO POST PARA CRIAR UMA NOVA ARMA
  async create(params) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/arma?_format=json`, params, {
        headers: {
          ...this.authHeader,
          'Content-Type': 'application/json',
        },
      });
      return new BaseRecord(response.data, this);
    } catch (error) {
      console.error('Erro ao criar registro:', error.message);
      throw error;
    }
  }

  // REQUISICAO PATCH PARA ATUALIZAR UM CLUBE EXISTENTE
  async update(uuid, params) {
    try {
      const response = await axios.patch(
        `${this.apiUrl}/api/arma/${uuid}?_format=json`,
        params,
        {
          headers: {
            ...this.authHeader,
            'Content-Type': 'application/json',
          },
        }
      );
      return new BaseRecord(response.data, this);
    } catch (error) {
      console.error(`Erro ao atualizar registro com ID ${uuid}:`, error.message);
      throw error;
    }
  }

  //REMOVE UMA ARMA
  async delete(uuid) {
    try {
      await axios.delete(`${this.apiUrl}/api/arma/${uuid}?_format=json`, {
        headers: this.authHeader,
      });
      return true;
    } catch (error) {
      console.error(`Erro ao excluir registro com ID ${uuid}:`, error.message);
      throw error;
    }
  }
}

export default ArmasResource;