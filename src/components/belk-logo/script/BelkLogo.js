import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkLogo',
  props: {
    smart: Boolean,
    width: {
      type: String,
      required: true,
      default: '120',
    },
    color: {
      type: String,
      default: 'lowlight-primary',
    },
  },

  data() {
    return {
      smartColor: 'lowlight-primary',
    };
  },

  mounted() {
    const width = `${this.width}px`;
    if (this.width) this.$refs.logo.style.maxWidth = width;

    if (this.color && !this.smart) {
      this.smartColor = this.color;
    } else if (this.smart) {
      let R;
      let G;
      let B;
      let parent;
      let
        node = this.$el;
      let cycles = 0;
      while (!parent && cycles < 5) {
        cycles += 1;
        node = node.parentElement;
        let bg = getComputedStyle(node).backgroundColor;
        if (bg.match('0, 0, 0, 0')) bg = false;
        if (bg) {
          parent = node;
          const split = bg.split('(')[1].split(',');
          [R, G, B] = [split[0], split[1], split[2]];
        }
      }
      const C = [R / 255, G / 255, B / 255];
      for (let i = 0; i < C.length; i += 1) {
        if (C[i] <= 0.03928) {
          C[i] /= 12.92;
        } else {
          C[i] = ((C[i] + 0.055) / 1.055 ** 2.4);
        }
      }
      const L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];
      if (L > 0.179) {
        this.smartColor = 'lowlight-primary';
      } else {
        this.smartColor = 'highlight-primary';
      }
    }
  },
};
