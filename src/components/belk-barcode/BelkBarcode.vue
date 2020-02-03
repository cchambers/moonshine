<template>
  <div class='belk-barcode' :variant='variant'>
    <svg ref='barcode'></svg>
  </div>
</template>

<script>
/* eslint-disable no-bitwise */
import JsBarcode from 'jsbarcode';
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkBarcode',
  props: {
    code: {
      type: String,
      default: '1234567890',
    },
  },

  data() {
    return {
      bars: [],
    };
  },

  mounted() {
    JsBarcode(this.$refs.barcode, this.code, {
      format: 'code128',
      lineColor: '#0aa',
      width: 4,
      height: 40,
      displayValue: false,
    });
  },
};
</script>
<style lang='scss' src='./style/default.scss'></style>
<style lang='scss' src='./style/primary.scss'></style>
