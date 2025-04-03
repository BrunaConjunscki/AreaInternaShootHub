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
    return record?.cnpj || null;
  }

  properties() {
    return [
      new BaseProperty({ path: 'cnpj', isId: true, type: 'string' }),
      new BaseProperty({ path: 'nome', type: 'string', isTitle: true }),
      new BaseProperty({ path: 'descricao', type: 'string' }),
      new BaseProperty({ path: 'cidade', type: 'string' }),
      new BaseProperty({ path: 'estado', type: 'string' }),
      new BaseProperty({ path: 'telefone', type: 'string' }),
      new BaseProperty({ path: 'email', type: 'string' }),
    ];
  }

  async find() {
    try {
      const response = await axios.get(`${this.apiUrl}/api/clube-de-tiro?_format=json`, {
        headers: this.authHeader,
      });
      return response.data.map((item) => new BaseRecord(item, this));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      return [];
    }
  }

  async findOne(id) {
    try {
      const response = await axios.get(`${this.apiUrl}/api/clube-de-tiro/${id}?_format=json`, {
        headers: this.authHeader,
      });
      return new BaseRecord(response.data, this);
    } catch (error) {
      console.error('Erro ao buscar registro:', error);
      return null;
    }
  }
}

export default DrupalResource;
