export interface CityItem {
  nome: string
  uf: string
}

export const ESTADOS_UF = [
  { uf: 'AC', nome: 'Acre' },
  { uf: 'AL', nome: 'Alagoas' },
  { uf: 'AP', nome: 'Amapá' },
  { uf: 'AM', nome: 'Amazonas' },
  { uf: 'BA', nome: 'Bahia' },
  { uf: 'CE', nome: 'Ceará' },
  { uf: 'DF', nome: 'Distrito Federal' },
  { uf: 'ES', nome: 'Espírito Santo' },
  { uf: 'GO', nome: 'Goiás' },
  { uf: 'MA', nome: 'Maranhão' },
  { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'MS', nome: 'Mato Grosso do Sul' },
  { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PA', nome: 'Pará' },
  { uf: 'PB', nome: 'Paraíba' },
  { uf: 'PR', nome: 'Paraná' },
  { uf: 'PE', nome: 'Pernambuco' },
  { uf: 'PI', nome: 'Piauí' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'RN', nome: 'Rio Grande do Norte' },
  { uf: 'RS', nome: 'Rio Grande do Sul' },
  { uf: 'RO', nome: 'Rondônia' },
  { uf: 'RR', nome: 'Roraima' },
  { uf: 'SC', nome: 'Santa Catarina' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'SE', nome: 'Sergipe' },
  { uf: 'TO', nome: 'Tocantins' },
]

export const BRAZILIAN_CITIES: CityItem[] = [
  // Capitals
  { nome: 'Salvador', uf: 'BA' },
  { nome: 'São Paulo', uf: 'SP' },
  { nome: 'Rio de Janeiro', uf: 'RJ' },
  { nome: 'Belo Horizonte', uf: 'MG' },
  { nome: 'Brasília', uf: 'DF' },
  { nome: 'Fortaleza', uf: 'CE' },
  { nome: 'Recife', uf: 'PE' },
  { nome: 'Curitiba', uf: 'PR' },
  { nome: 'Porto Alegre', uf: 'RS' },
  { nome: 'Manaus', uf: 'AM' },
  { nome: 'Belém', uf: 'PA' },
  { nome: 'Goiânia', uf: 'GO' },
  { nome: 'Vitória', uf: 'ES' },
  { nome: 'Florianópolis', uf: 'SC' },
  { nome: 'Natal', uf: 'RN' },
  { nome: 'Maceió', uf: 'AL' },
  { nome: 'João Pessoa', uf: 'PB' },
  { nome: 'Teresina', uf: 'PI' },
  { nome: 'Aracaju', uf: 'SE' },
  { nome: 'Campo Grande', uf: 'MS' },
  { nome: 'Cuiabá', uf: 'MT' },
  { nome: 'São Luís', uf: 'MA' },
  { nome: 'Porto Velho', uf: 'RO' },
  { nome: 'Macapá', uf: 'AP' },
  { nome: 'Rio Branco', uf: 'AC' },
  { nome: 'Boa Vista', uf: 'RR' },
  { nome: 'Palmas', uf: 'TO' },

  // Bahia (BA)
  { nome: 'Feira de Santana', uf: 'BA' },
  { nome: 'Vitória da Conquista', uf: 'BA' },
  { nome: 'Camaçari', uf: 'BA' },
  { nome: 'Juazeiro', uf: 'BA' },
  { nome: 'Itabuna', uf: 'BA' },
  { nome: 'Ilhéus', uf: 'BA' },
  { nome: 'Lauro de Freitas', uf: 'BA' },
  { nome: 'Jequié', uf: 'BA' },
  { nome: 'Teixeira de Freitas', uf: 'BA' },
  { nome: 'Barreiras', uf: 'BA' },
  { nome: 'Alagoinhas', uf: 'BA' },
  { nome: 'Porto Seguro', uf: 'BA' },
  { nome: 'Simões Filho', uf: 'BA' },
  { nome: 'Paulo Afonso', uf: 'BA' },
  { nome: 'Eunápolis', uf: 'BA' },
  { nome: 'Santo Antônio de Jesus', uf: 'BA' },
  { nome: 'Valença', uf: 'BA' },
  { nome: 'Candeias', uf: 'BA' },
  { nome: 'Guanambi', uf: 'BA' },
  { nome: 'Jacobina', uf: 'BA' },
  { nome: 'Serrinha', uf: 'BA' },
  { nome: 'Senhor do Bonfim', uf: 'BA' },
  { nome: 'Dias d\'Ávila', uf: 'BA' },

  // São Paulo (SP)
  { nome: 'Campinas', uf: 'SP' },
  { nome: 'Guarulhos', uf: 'SP' },
  { nome: 'São Bernardo do Campo', uf: 'SP' },
  { nome: 'Santo André', uf: 'SP' },
  { nome: 'Osasco', uf: 'SP' },
  { nome: 'São José dos Campos', uf: 'SP' },
  { nome: 'Ribeirão Preto', uf: 'SP' },
  { nome: 'Sorocaba', uf: 'SP' },
  { nome: 'Santos', uf: 'SP' },
  { nome: 'Mauá', uf: 'SP' },
  { nome: 'São José do Rio Preto', uf: 'SP' },
  { nome: 'Mogi das Cruzes', uf: 'SP' },
  { nome: 'Jundiaí', uf: 'SP' },
  { nome: 'Piracicaba', uf: 'SP' },
  { nome: 'Bauru', uf: 'SP' },
  { nome: 'São Vicente', uf: 'SP' },
  { nome: 'Itaquaquecetuba', uf: 'SP' },
  { nome: 'Carapicuíba', uf: 'SP' },
  { nome: 'Salto', uf: 'SP' },
  { nome: 'Salto de Pirapora', uf: 'SP' },
  { nome: 'Praia Grande', uf: 'SP' },
  { nome: 'Guarujá', uf: 'SP' },
  { nome: 'Taubaté', uf: 'SP' },
  { nome: 'Limeira', uf: 'SP' },
  { nome: 'Suzano', uf: 'SP' },
  { nome: 'Taboão da Serra', uf: 'SP' },
  { nome: 'Sumaré', uf: 'SP' },
  { nome: 'Barueri', uf: 'SP' },
  { nome: 'Embu das Artes', uf: 'SP' },
  { nome: 'São Carlos', uf: 'SP' },
  { nome: 'Americana', uf: 'SP' },
  { nome: 'Marília', uf: 'SP' },
  { nome: 'Araraquara', uf: 'SP' },
  { nome: 'Presidente Prudente', uf: 'SP' },

  // Rio de Janeiro (RJ)
  { nome: 'Niterói', uf: 'RJ' },
  { nome: 'São Gonçalo', uf: 'RJ' },
  { nome: 'Duque de Caxias', uf: 'RJ' },
  { nome: 'Nova Iguaçu', uf: 'RJ' },
  { nome: 'Campos dos Goytacazes', uf: 'RJ' },
  { nome: 'Belford Roxo', uf: 'RJ' },
  { nome: 'São João de Meriti', uf: 'RJ' },
  { nome: 'Petrópolis', uf: 'RJ' },
  { nome: 'Volta Redonda', uf: 'RJ' },
  { nome: 'Macaé', uf: 'RJ' },
  { nome: 'Magé', uf: 'RJ' },
  { nome: 'Itaboraí', uf: 'RJ' },
  { nome: 'Cabo Frio', uf: 'RJ' },
  { nome: 'Angra dos Reis', uf: 'RJ' },
  { nome: 'Nova Friburgo', uf: 'RJ' },
  { nome: 'Teresópolis', uf: 'RJ' },
  { nome: 'Maricá', uf: 'RJ' },
  { nome: 'Resende', uf: 'RJ' },

  // Minas Gerais (MG)
  { nome: 'Uberlândia', uf: 'MG' },
  { nome: 'Contagem', uf: 'MG' },
  { nome: 'Juiz de Fora', uf: 'MG' },
  { nome: 'Betim', uf: 'MG' },
  { nome: 'Montes Claros', uf: 'MG' },
  { nome: 'Ribeirão das Neves', uf: 'MG' },
  { nome: 'Uberaba', uf: 'MG' },
  { nome: 'Governador Valadares', uf: 'MG' },
  { nome: 'Ipatinga', uf: 'MG' },
  { nome: 'Sete Lagoas', uf: 'MG' },
  { nome: 'Divinópolis', uf: 'MG' },
  { nome: 'Santa Luzia', uf: 'MG' },
  { nome: 'Poços de Caldas', uf: 'MG' },
  { nome: 'Patos de Minas', uf: 'MG' },
  { nome: 'Pouso Alegre', uf: 'MG' },
  { nome: 'Salinas', uf: 'MG' },
  { nome: 'Ouro Preto', uf: 'MG' },

  // Rio Grande do Sul (RS)
  { nome: 'Caxias do Sul', uf: 'RS' },
  { nome: 'Canoas', uf: 'RS' },
  { nome: 'Pelotas', uf: 'RS' },
  { nome: 'Santa Maria', uf: 'RS' },
  { nome: 'Gravataí', uf: 'RS' },
  { nome: 'Viamão', uf: 'RS' },
  { nome: 'Novo Hamburgo', uf: 'RS' },
  { nome: 'São Leopoldo', uf: 'RS' },
  { nome: 'Passo Fundo', uf: 'RS' },
  { nome: 'Rio Grande', uf: 'RS' },

  // Paraná (PR)
  { nome: 'Londrina', uf: 'PR' },
  { nome: 'Maringá', uf: 'PR' },
  { nome: 'Ponta Grossa', uf: 'PR' },
  { nome: 'Cascavel', uf: 'PR' },
  { nome: 'São José dos Pinhais', uf: 'PR' },
  { nome: 'Foz do Iguaçu', uf: 'PR' },
  { nome: 'Colombo', uf: 'PR' },
  { nome: 'Guarapuava', uf: 'PR' },

  // Ceará (CE)
  { nome: 'Caucaia', uf: 'CE' },
  { nome: 'Juazeiro do Norte', uf: 'CE' },
  { nome: 'Maracanaú', uf: 'CE' },
  { nome: 'Sobral', uf: 'CE' },
  { nome: 'Crato', uf: 'CE' },

  // Pernambuco (PE)
  { nome: 'Jaboatão dos Guararapes', uf: 'PE' },
  { nome: 'Olinda', uf: 'PE' },
  { nome: 'Caruaru', uf: 'PE' },
  { nome: 'Petrolina', uf: 'PE' },
  { nome: 'Paulista', uf: 'PE' },
  { nome: 'Cabo de Santo Agostinho', uf: 'PE' },

  // Goiás (GO)
  { nome: 'Aparecida de Goiânia', uf: 'GO' },
  { nome: 'Anápolis', uf: 'GO' },
  { nome: 'Rio Verde', uf: 'GO' },
  { nome: 'Luziânia', uf: 'GO' },
  { nome: 'Águas Lindas de Goiás', uf: 'GO' },

  // Santa Catarina (SC)
  { nome: 'Joinville', uf: 'SC' },
  { nome: 'Blumenau', uf: 'SC' },
  { nome: 'São José', uf: 'SC' },
  { nome: 'Chapecó', uf: 'SC' },
  { nome: 'Criciúma', uf: 'SC' },
  { nome: 'Itajaí', uf: 'SC' },
  { nome: 'Jaraguá do Sul', uf: 'SC' },
  { nome: 'Palhoça', uf: 'SC' },
  { nome: 'Balneário Camboriú', uf: 'SC' },

  // Maranhão (MA)
  { nome: 'Imperatriz', uf: 'MA' },
  { nome: 'São José de Ribamar', uf: 'MA' },
  { nome: 'Timon', uf: 'MA' },
  { nome: 'Caxias', uf: 'MA' },

  // Espírito Santo (ES)
  { nome: 'Vila Velha', uf: 'ES' },
  { nome: 'Serra', uf: 'ES' },
  { nome: 'Cariacica', uf: 'ES' },
  { nome: 'Cachoeiro de Itapemirim', uf: 'ES' },
  { nome: 'Linhares', uf: 'ES' },

  // Mato Grosso & MS
  { nome: 'Várzea Grande', uf: 'MT' },
  { nome: 'Rondonópolis', uf: 'MT' },
  { nome: 'Sinop', uf: 'MT' },
  { nome: 'Dourados', uf: 'MS' },
  { nome: 'Três Lagoas', uf: 'MS' },

  // Paraíba, RN, Alagoas, Sergipe, Piauí
  { nome: 'Campina Grande', uf: 'PB' },
  { nome: 'Santa Rita', uf: 'PB' },
  { nome: 'Mossoró', uf: 'RN' },
  { nome: 'Parnamirim', uf: 'RN' },
  { nome: 'Arapiraca', uf: 'AL' },
  { nome: 'Nossa Senhora do Socorro', uf: 'SE' },
  { nome: 'Lagarto', uf: 'SE' },
  { nome: 'Parnaíba', uf: 'PI' },

  // Pará & Amazonas & others
  { nome: 'Ananindeua', uf: 'PA' },
  { nome: 'Santarém', uf: 'PA' },
  { nome: 'Marabá', uf: 'PA' },
  { nome: 'Parauapebas', uf: 'PA' },
  { nome: 'Parintins', uf: 'AM' },
  { nome: 'Ji-Paraná', uf: 'RO' },
  { nome: 'Santana', uf: 'AP' },
  { nome: 'Araguaína', uf: 'TO' },
]

export function filterCities(query: string, maxResults = 8): CityItem[] {
  if (!query || query.trim().length === 0) return []

  const normalizedQuery = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  return BRAZILIAN_CITIES.filter((city) => {
    const normalizedName = city.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return normalizedName.includes(normalizedQuery)
  }).slice(0, maxResults)
}
