/* eslint-disable no-undef */
import Vue from 'vue';
import wrap from '../wrapper';
import Link from './Link.vue';

const Wrapped = wrap(Vue, Link);
window.customElements.define('sh-link', Wrapped);


/*
* Unit tests:
* https: //vue-test-utils.vuejs.org/guides/getting-started.html
*/
// describe('Link', () => {
//   // Inspect the raw component options
//   it('has a `snap` method', () => {
//     expect(typeof Link.methods.snap).toBe('function');
//   });
// });
