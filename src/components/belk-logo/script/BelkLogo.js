//import ComponentPrototype from '../../../components/component-prototype';

export default {
  //mixins: [ComponentPrototype],

  name: 'BelkLogo',
  props: {
    smart: Boolean,
    width: Number,
    color: {
      type: String,
      default: 'lowlight-primary'
    }
  },

  data() {
    return {
      smartColor: 'lowlight-primary'
    }
  },

  mounted() {
    let _w = `${this.width}px`;
    if (this.width) this.$refs.logo.style.maxWidth = _w;

    if (this.color && !this.smart) {
      this.smartColor = this.color;
    } else if (this.smart) {
        var R, G, B, C, L;
        let parent, node = this.$el;
        let cycles = 0;
        while (!parent && cycles < 5) {
          cycles++;
          node = node.parentElement; 
          let bg = getComputedStyle(node).backgroundColor;
          if (bg.match('0, 0, 0, 0')) bg = false;
          if (bg) {
            parent = node;
            let split = bg.split('(')[1].split(',');
            R = split[0]
            G = split[1]
            B = split[2]
          }
        }
        C = [ R/255, G/255, B/255 ];
        for ( var i = 0; i < C.length; ++i ) {
          if ( C[i] <= 0.03928 ) {
            C[i] = C[i] / 12.92
          } else {
            C[i] = Math.pow( ( C[i] + 0.055 ) / 1.055, 2.4);
          }
        }
        L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];
        if ( L > 0.179 ) {
          this.smartColor = 'lowlight-primary';
        } else {
          this.smartColor = 'highlight-primary';
        }
      }
    }
  }