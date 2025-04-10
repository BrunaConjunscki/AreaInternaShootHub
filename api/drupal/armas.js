export const adaptadorDeArmas = (arma) => {
    const sanitize = (str) => {
      if (!str) return 'Não informado';
      return str
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/<[^>]*>/g, '') // remove tags HTML
        .trim();
    };
  
    return {
      id: arma.uuid || arma.nid || null,
      nome: sanitize(arma.nome),
      modelo: sanitize(arma.modelo || arma.codigo),
      fabricante: sanitize(arma.fabricante),
      calibre: sanitize(arma.calibre),
      acao: sanitize(arma.acao),
      capacidade: sanitize(arma.capacidade),
      comprimentoCano: sanitize(arma.omprimento_cano || arma.comprimento_cano),
      comprimentoTotal: sanitize(arma.comprimento_total),
      altura: sanitize(arma.altura_total),
      largura: sanitize(arma.largura),
      pesoCarregadorVazio: sanitize(arma.peso_carregador_vazio),
      pesoGatilho: sanitize(arma.peso_gatilho),
      tipo: sanitize(arma.tipo_arma),
      mira: sanitize(arma.tipo_mira),
      acabamento: sanitize(arma.acabamentos),
      descricao: sanitize(arma.descricao),
      trilhoPicadilly: arma.trilho_picadily === 'SIM',
      travaPercursor: arma.trava_percursor === 'SIM',
      ambidestra: arma.ambdestra === 'SIM',
      sentidoRaia: sanitize(arma.sentido_raia),
      numeroRaias: sanitize(arma.numero_raias),
      sistemaRecarga: sanitize(arma.sistema_de_recarga),
      energia: sanitize(arma.energia),
      refrigeracao: sanitize(arma.refrigeracao),
      emprego: sanitize(arma.emprego),
      material: sanitize(arma.material),
      funcionamento: sanitize(arma.funcionamento),
      mobilidade: sanitize(arma.mobilidade),
      indicadorMunicaoCamara: arma.indicador_municao_camara === 'SIM',
      desarmeCao: arma.desarme_cao === 'SIM',
      retemCarregadorBidestro: arma.retem_carregador_bidestro === 'SIM',
      distanciaEntreMiras: sanitize(arma.distancia_entre_miras),
    };
  };
  