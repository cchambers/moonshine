/* eslint-disable no-undef */
import Vue from 'vue';
import wrap from '../wrapper';
import BelkProduct from './BelkProduct.vue';

const Wrapped = wrap(Vue, BelkProduct);
window.customElements.define('belk-product', Wrapped);


/*
* Unit tests:
* https: //vue-test-utils.vuejs.org/guides/getting-started.html
*/
// describe('BelkProduct', () => {
//   // Inspect the raw component options
//   it('has a `snap` method', () => {
//     expect(typeof BelkProduct.methods.snap).toBe('function');
//   });
// });
