import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ShopPage from '../pages/ShopPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';

Given('Kullanici Esra Helvaci yeni sezon sayfasina gider', () => {
  ShopPage.visit();
});

When('Kullanici urun listesinden bir urun secer', () => {
  ShopPage.selectRandomProduct();
});

When('Urun detay sayfasinda beden secip sepete ekler', () => {
  ProductDetailPage.selectSizeAndAddToCart();
});

Then('Urunun sepette basariyla eklendigini dogrular', () => {
  CartPage.verifyProductInCart();
});