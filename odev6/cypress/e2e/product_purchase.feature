Feature: Esra Helvaci Yeni Sezon Ürün Arama ve Sepete Ekleme

  Scenario: Kullanici yeni sezon sayfasindan bir urun secer ve sepete ekler
    Given Kullanici Esra Helvaci yeni sezon sayfasina gider
    When Kullanici urun listesinden bir urun secer
    And Urun detay sayfasinda beden secip sepete ekler
    Then Urunun sepette basariyla eklendigini dogrular