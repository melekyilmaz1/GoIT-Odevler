class WeatherstackService {
    constructor() {
      this.apiUrl = 'https://api.weatherstack.com/current';
    }
  
    getHeaders(customHeaders = {}) {
      return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json',
        ...customHeaders
      };
    }
  
    checkWeather(query, options = {}) {
      // Cypress 16+ standardı: cy.env içine dizi (array) verilir ve destruct edilerek alınır
      return cy.env(['WEATHERSTACK_API_KEY']).then(({ WEATHERSTACK_API_KEY }) => {
        const defaultQuery = {
          access_key: WEATHERSTACK_API_KEY,
          query: query,
          ...options.qs
        };
  
        return cy.request({
          method: options.method || 'GET',
          url: options.url || this.apiUrl,
          headers: this.getHeaders(options.headers),
          qs: defaultQuery,
          body: options.body,
          failOnStatusCode: options.failOnStatusCode ?? false
        });
      });
    }
  }
  
  export default new WeatherstackService();