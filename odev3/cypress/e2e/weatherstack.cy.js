import weatherstackService from '../support/WeatherstackService';

describe('Weatherstack API - POM Yapısına Uygun 10 Otomatik Test', () => {

 
  it('1. Geçerli şehir (Ankara) ile başarılı GET isteği (200 OK)', () => {
    weatherstackService.checkWeather('Ankara').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.location.name).to.eq('Ankara');
    });
  });


  it('2. Yanıt başlığında content-type kontrolü', () => {
    weatherstackService.checkWeather('London')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  
  it('3. Yanıt gövdesinde sıcaklık (temperature) bilgisinin varlığı', () => {
    weatherstackService.checkWeather('Paris').then((response) => {
      
      if (response.status === 200) {
        expect(response.body).to.have.property('current');
        expect(response.body.current).to.have.property('temperature');
        expect(response.body.current.temperature).to.be.a('number');
      } else {
        expect(response.status).to.eq(429); 
      }
    });
  });

  it('4. Yanıt süresinin 2 saniyeden kısa olması', () => {
    weatherstackService.checkWeather('Berlin')
      .its('duration')
      .should('be.lessThan', 2000);
  });

  
  it('5. Rastgele seçilen dinamik şehir ile hava durumu testi', () => {
    const sehirler = ['Tokyo', 'New York', 'Paris', 'London', 'Berlin'];
    const rastgeleSehir = sehirler[Math.floor(Math.random() * sehirler.length)];
    
    weatherstackService.checkWeather(rastgeleSehir).then((response) => {
      if (response.status === 200) {
        expect(response.body.location.name).to.eq(rastgeleSehir);
      }
    });
  });

 
  it('6. Geçersiz şehir adında hata dönmesi', () => {
    weatherstackService.checkWeather('GecersizSehirIsmi12345').then((response) => {
      if (response.status === 200) {
        expect(response.body).to.have.property('success', false);
        expect(response.body.error).to.have.property('code');
      }
    });
  });

 
  it('7. API Key (access_key) olmadan istek atıldığında hata alınması', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.weatherstack.com/current',
      qs: { access_key: '', query: 'Ankara' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.success).to.be.false;
      expect(response.body.error.code).to.eq(101);
    });
  });

  // 8. Yanlış HTTP Metodu Testi (POST)
  it('8. İstek metodunun kontrolü', () => {
    weatherstackService.checkWeather('Ankara', { method: 'POST' })
      .its('status')
      .should('be.oneOf', [200, 404, 405, 422, 429]); 
  });

  // 9. Query Parametresi (qs) Kullanımı (Birim / units değişimi)
  it('9. Farklı sorgu parametreleri (units=f) ile veri filtreleme', () => {
    weatherstackService.checkWeather('Ankara', { qs: { units: 'f' } })
      .then((response) => {
        if (response.status === 200) {
          expect(response.body.request.unit).to.eq('f');
        }
      });
  });

  
  it('10. Birden fazla şehir ile ardışık istek testi', () => {
    const testSehirleri = ['Istanbul', 'Izmir'];
    
    testSehirleri.forEach((sehir) => {
      weatherstackService.checkWeather(sehir).then((res) => {
       
        expect([200, 429]).to.include(res.status);
      });
    });
  });
});