  import ComponentPrototype from '../../component-prototype';

  export default {
    mixins: [ComponentPrototype],

  name: 'Slider',

  props: {},

  data() {
    return {
      deltaX: 0,
      deltaY: 0,
      startX: 0,
      startY: 0,
      clickX: 0,
      clickY: 0
    }
  },
  
  methods: {
    panHandler(e) { // lmao
      this.deltaX = e.deltaX;
      this.deltaY = e.deltaY;

      this.clickX = Math.round(e.srcEvent.offsetX);
      this.clickY = Math.round(e.srcEvent.offsetY);
    }
  },
}