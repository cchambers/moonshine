/* eslint-disable no-undef */
import Vue from 'vue';
import wrap from '../wrapper';
import ComponentTemplate from './ComponentTemplate.vue';

const Wrapped = wrap(Vue, ComponentTemplate);
window.customElements.define('component-template', Wrapped);


/*
* Unit tests:
* https: //vue-test-utils.vuejs.org/guides/getting-started.html
*/
// describe('ComponentTemplate', () => {
//   // Inspect the raw component options
//   it('has a `snap` method', () => {
//     expect(typeof ComponentTemplate.methods.snap).toBe('function');
//   });
// });
