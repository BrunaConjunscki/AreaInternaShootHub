// src/api/drupal/clubes.js
import BaseDrupalResource from '../../ClubesResource';

class ClubesResource extends BaseDrupalResource {
  static get name() {
    return 'ClubesDeTiro';
  }

  constructor() {
    super('clube-de-tiro', [
      { path: 'cnpj', isId: true, type: 'string' },
      { path: 'nome', isTitle: true, type: 'string' },
      { path: 'descricao', type: 'textarea' },
      { path: 'cidade', type: 'string' },
      { path: 'estado', type: 'string' },
      { path: 'telefone', type: 'string' },
      { path: 'email', type: 'email' },
    ]);
  }
}

export default ClubesResource;
