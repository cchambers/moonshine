import Popper from '../../../assets/script/popper';

export default {
  name: 'BelkTakeover',

  data() {
    return {
      active: false,
      referenceElm: null,
      popperJS: null,
      showPopper: false,
      mobile: false,
      currentPlacement: '',
      popperOptions: {
        placement: 'left-start',
        modifiers: {
          preventOverflow: {
            boundariesElement: this.scrollingEl,
            priority: ['top'],
            padding: 0
          }
        }
      }
    }
  },


  mounted() {
    this.referenceEl = document.querySelector('.documentation.contain'); 
    this.scrollingEl = document.querySelector('main');
    this.popperOptions.modifiers.preventOverflow.boundariesElement = this.scrollingEl;
    this.popper = this.$refs.popper;

    this.popperOptions.onCreate = () => {
      this.$emit('created', this);
      this.$nextTick(this.updatePopper);
    };
    
    this.popperJS = new Popper(this.referenceEl, this.popper, this.popperOptions);
    // this.popperJS.enableEventListeners();
  },
  
  methods: {
    updatePopper() {
      if (this.popperJS) this.popperJS.scheduleUpdate();
    },
  },

}