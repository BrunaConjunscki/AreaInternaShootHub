import axios from 'axios';
import { BaseResource, BaseRecord, BaseProperty } from 'adminjs';

class DrupalResource extends BaseResource {
  constructor() {
    super();
    this.apiUrl = process.env.DRUPAL_API_URL;
    this.authHeader = {
      Authorization: `Basic ${process.env.DRUPAL_AUTH}`,
    };
  }

  id(record) {
    return record?.cnpj || record?.id || null;
  }

  static get name() {
    return 'ClubesDeTiro';
  }

  properties() {
    return [
      new BaseProperty({ path: 'cnpj', isId: true, type: 'string' }),
      new BaseProperty({ path: 'nome', type: 'string', isTitle: true }),
      new BaseProperty({ path: 'descricao', type: 'textarea' }),
      new BaseProperty({ path: 'cidade', type: 'string' }),
      new BaseProperty({ path: 'estado', type: 'string' }),
      new BaseProperty({ path: 'telefone', type: 'string' }),
      new BaseProperty({ path: 'email', type: 'email' }),
    ];
  }

  async find(query = {}) {
    try {
      const { limit = 10, offset = 0, ...filterQuery } = query;

      const response = await axios.get(`${this.apiUrl}/api/clube-de-tiro?_format=json`, {
        headers: this.authHeader,
      });

      // Log para debug
      console.log(`Encontrados ${response.data.length} clubes de tiro`);

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

  async count(query = {}) {
    try {
      const response = await axios.get(`${this.apiUrl}/api/clube-de-tiro?_format=json`, {
        headers: this.authHeader,
      });
      return response.data.length;
    } catch (error) {
      console.error('Erro ao contar registros:', error.message);
      return 0;
    }
  }

  async findOne(id) {
    try {
      console.log(`Buscando clube com ID/CNPJ: ${id}`);
      const response = await axios.get(`${this.apiUrl}/api/clube-de-tiro/${id}?_format=json`, {
        headers: this.authHeader,
      });
      return new BaseRecord(response.data, this);
    } catch (error) {
      console.error(`Erro ao buscar registro com ID ${id}:`, error.message);
      return null;
    }
  }

  async create(params) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/clube-de-tiro?_format=json`, params, {
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

  async update(id, params) {
    try {
      const response = await axios.patch(
        `${this.apiUrl}/api/clube-de-tiro/${id}?_format=json`,
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
      console.error(`Erro ao atualizar registro com ID ${id}:`, error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      await axios.delete(`${this.apiUrl}/api/clube-de-tiro/${id}?_format=json`, {
        headers: this.authHeader,
      });
      return true;
    } catch (error) {
      console.error(`Erro ao excluir registro com ID ${id}:`, error.message);
      throw error;
    }
  }
}

export default DrupalResource;
