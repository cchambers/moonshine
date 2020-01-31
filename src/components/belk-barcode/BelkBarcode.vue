<template>
  <div class='belk-barcode' :letiant='letiant'>
    <canvas ref='barcode'></canvas>
  </div>
</template>

<script>
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkBarcode',
  props: {
    code: {
      type: String,
      default: '1234567890'
    },
  },

  data() {
    return {
      bars: [],
    };
  },

  methods: {
    appendDigits(s, invert) {
      if (invert === void 0) {
        invert = false;
      }
      for (let _i = 0, s_4 = s; _i < s_4.length; _i += 1) {
        let c = s_4[_i];
        this.bars.push(parseInt(c, 10) ^ (invert ? 1 : 0));
      }
    },

    appendNarrowWide(s, narrow, wide) {
      let color = 0;
      for (let _i = 0, s_5 = s; _i < s_5.length; _i += 1) {
        let c = s_5[_i];
        let rep = c == 'n' ? narrow : wide;
        for (let i = 0; i < rep; i += 1) {
          this.bars.push(color);
        }
        color ^= 1;
      }
    },

    code93(s) {
      
      let t = '';
      for (let i = 0; i < s.length; i += 1) {
        let c = s.charCodeAt(i);
        if (c >= 128) {
          throw 'Text must only contain ASCII characters';
        } else if (
          c == 32 ||
          c == 45 ||
          c == 46 ||
          (48 <= c && c <= 57) ||
          (65 <= c && c <= 90)
        ) {
          t += String.fromCharCode(c);
        } else if (c == 0) {
          t += 'bU';
        } else if (c == 64) {
          t += 'bV';
        } else if (c == 96) {
          t += 'bW';
        } else if (c == 127) {
          t += 'bT';
        } else if (c <= 26) {
          t += 'a' + String.fromCharCode(c - 1 + 65);
        } else if (c <= 31) {
          t += 'b' + String.fromCharCode(c - 27 + 65);
        } else if (c <= 58) {
          t += 'c' + String.fromCharCode(c - 33 + 65);
        } else if (c <= 63) {
          t += 'b' + String.fromCharCode(c - 54 + 65);
        } else if (c <= 95) {
          t += 'b' + String.fromCharCode(c - 81 + 65);
        } else if (c <= 122) {
          t += 'd' + String.fromCharCode(c - 97 + 65);
        } else if (c <= 126) {
          t += 'b' + String.fromCharCode(c - 108 + 65);
        } else {
          throw 'Assertion error';
        }
      }
      s = t; 
      
      let ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*'; 
      [20, 15].forEach(mod => {
        let checksum = 0;
        for (let i = 0; i < s.length; i += 1) {
          let code = ALPHABET.indexOf(s.charAt(s.length - 1 - i));
          let weight = (i % mod) + 1;
          checksum = (checksum + code * weight) % 47;
        }
        s += ALPHABET.charAt(checksum);
      });
      s = '*' + s + '*'; 
      
      const TABLE = [
        '1110101',
        '1011011',
        '1011101',
        '1011110',
        '1101011',
        '1101101',
        '1101110',
        '1010111',
        '1110110',
        '1111010',
        '0101011',
        '0101101',
        '0101110',
        '0110101',
        '0110110',
        '0111010',
        '1001011',
        '1001101',
        '1001110',
        '1100101',
        '1110010',
        '1010011',
        '1011001',
        '1011100',
        '1101001',
        '1110100',
        '0100101',
        '0100110',
        '0101001',
        '0101100',
        '0110100',
        '0110010',
        '1001001',
        '1001100',
        '1100100',
        '1100010',
        '1101000',
        '0010101',
        '0010110',
        '0011010',
        '1001000',
        '1000100',
        '0101000',
        '1101100',
        '0010010',
        '0010100',
        '1100110',
        '1010000'
      ];
      for (let _i = 0, s_1 = s; _i < s_1.length; _i += 1) {
        const c = s_1[_i];
        this.appendDigits('0' + TABLE[ALPHABET.indexOf(c)] + '1');
      }
      this.appendDigits('0'); 
      return this;
    },

    generate() {
      try {
        let canvas = document.querySelector('canvas');
        if (!(canvas instanceof HTMLCanvasElement)) {
          throw 'Assertion error';
        }
        let graphics = canvas.getContext('2d');
        if (!(graphics instanceof CanvasRenderingContext2D)) {
          throw 'Assertion error';
        }
        graphics.clearRect(0, 0, canvas.width, canvas.height);
        const barcode = this.code93(this.code).bars; 
        const scale1 = 3;
        const padding1 = 0; 
        const width1 = (canvas.width = barcode.length * scale1 + padding1 * 2);
        const height1 = (canvas.height = 100 + padding1 * 2);
        const image = graphics.createImageData(width1, height1);
        const pixels_1 = image.data; 
        for (let i = 0; i < pixels_1.length; i += 1) pixels_1[i] = 0xff;
        barcode.forEach((barcolor, i) => {
          for (let y = padding1; y < height1 - padding1; y += 1) {
            for (let x = padding1 + i * scale1, dx = 0; dx < scale1; dx += 1) {
              const k = (y * width1 + x + dx) * 4;
              pixels_1[k + 0] = pixels_1[k + 1] = pixels_1[k + 2] = barcolor * 255;
            }
          }
        });
        graphics.putImageData(image, 0, 0);
      } catch (e) {
        this.log(`BARCODE ERR: ${e}`);
      }
    },
  },

  mounted() {
    this.generate();
  },
};
</script>
<style lang='scss' src='./style/default.scss'></style>
<style lang='scss' src='./style/primary.scss'></style>
