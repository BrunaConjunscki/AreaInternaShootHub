import axios from 'axios';
import { BaseResource, BaseRecord } from 'adminjs';

class DrupalResource extends BaseResource {
  constructor() {
    super();
    this.apiUrl = process.env.DRUPAL_API_URL; // URL da API
    this.authHeader = {
      Authorization: `Basic ${process.env.DRUPAL_AUTH}`, // Autenticação básica
    };
  }

  async find(filter, params) {
    const response = await axios.get(`${this.apiUrl}/api/arma`, {
      headers: this.authHeader,
    });
    return response.data.map((item) => new BaseRecord(item, this));
  }

  async findOne(id) {
    const response = await axios.get(`${this.apiUrl}/node/${id}`, {
      headers: this.authHeader,
    });
    return new BaseRecord(response.data, this);
  }

  async create(params) {
    const response = await axios.post(`${this.apiUrl}/node`, params, {
      headers: { ...this.authHeader, 'Content-Type': 'application/json' },
    });
    return new BaseRecord(response.data, this);
  }

  async update(id, params) {
    const response = await axios.patch(`${this.apiUrl}/node/${id}`, params, {
      headers: { ...this.authHeader, 'Content-Type': 'application/json' },
    });
    return new BaseRecord(response.data, this);
  }

  async delete(id) {
    await axios.delete(`${this.apiUrl}/node/${id}`, {
      headers: this.authHeader,
    });
    return id;
  }
}

export default DrupalResource;
