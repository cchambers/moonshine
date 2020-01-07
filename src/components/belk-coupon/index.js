import Vue from 'vue';
import wrap from '../wrapper';
import BelkCoupon from './vue/BelkCoupon.vue';

const Wrapped = wrap(Vue, BelkCoupon);
window.customElements.define('belk-coupon', Wrapped);
