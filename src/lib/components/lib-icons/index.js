/* eslint-disable no-undef */
import Vue from 'vue';
import wrap from '../../../components/wrapper';
import LibIcons from './LibIcons.vue';

const Wrapped = wrap(Vue, LibIcons);
window.customElements.define('lib-icons', Wrapped);


/*
* Unit tests:
* https: //vue-test-utils.vuejs.org/guides/getting-started.html
*/
// describe('LibIcons', () => {
//   // Inspect the raw component options
//   it('has a `snap` method', () => {
//     expect(typeof LibIcons.methods.snap).toBe('function');
//   });
// });
