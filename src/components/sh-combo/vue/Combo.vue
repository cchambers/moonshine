<template>
  <div
    class="sh-combo"
    :variant="variant"
    :class="{
      active: isActive,
      native: native,
    }"
  >
    <div class="combo-actual">
      <button
        class="combo-trigger"
        ref="trigger"
        v-hammer:tap="buttonHandler"
        v-on:keydown.down="highlightHandler"
        v-on:keydown.up="highlightHandler"
        v-on:keydown.enter="enterHandler"
      >
        <div class="combo-text">{{ activeText }}</div>
        <belk-icon name="arrow-down"></belk-icon>
      </button>
      <div ref="htmlopts" class="combo-hidden-options" hidden>
        <slot name="options"></slot>
      </div>
      <div ref="options" class="combo-options" v-hammer:tap="optionClickHandler">
        <ul>
          <li
            v-for="item in options"
            v-bind:key="item.index"
            v-bind:value="item.value"
            v-bind:class="{ active: item.active, highlight: item.highlight }"
          >{{ item.text }}</li>
        </ul>
      </div>
    </div>
    <div class="combo-select" ref="select">
      <select v-on:change="selectHandler">
        <option value="blank_opt" disabled selected>{{ defaultText }}</option>
        <option
          v-for="item in options"
          v-bind:key="item.index"
          v-bind:value="item.value"
          v-bind:selected="item.active"
        >{{ item.text }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Combo',

  props: {
    comboOptions: {
      type: Array,
      default: () => [],
    },
    target: {
      type: String,
    },
    native: {
      type: Boolean,
    },
    id: {
      type: String,
    },
    defaultText: {
      type: String,
      default: 'Select',
    },
  },

  data() {
    return {
      isActive: false,
      activeText: 'Select',
      activeIndex: 0,
      highlightedIndex: 0,
      options: [],
      button: {},
      ignoreKeys: [37, 39, 91, 16, 13],
      navKeys: [38, 40],
      value: undefined,
      selectId: undefined,
    };
  },

  watch: {
    isActive(val) {
      if (val) {
        this.$bus.$emit('combo-opening', {
          id: this.uuid,
        });
      }
    },
  },

  created() {
    this.setUUID();
  },

  mounted() {
    const self = this;
    setTimeout(() => {
      const opts = this.$refs.htmlopts.querySelectorAll('li');
      if (opts.length > 0) self.processHTMLOptions(opts);
    }, 1000);
    if (self.native) {
      self.selectId = `sel-${self.uuid}`;
    }

    if (this.defaultText.length > 0) this.activeText = this.defaultText;
  },

  methods: {
    events() {
      document.addEventListener('click', (e) => {
        if (!this.elementContains(this.$el, e.target) && this.isActive) {
          this.toggleActive('off-click');
        }
      });

      this.$bus.$on('combo-opening', (data) => {
        if (data.id === this.uuid) return;
        if (this.isActive) {
          this.toggleActive('combo-opening handler');
        }
      });

      if (this.target) {
        this.$bus.$on('view-swapper-changed', this.swapperChangedHandler);
      }
      if (this.comboOptions.length) this.options = this.comboOptions;
      this.$bus.$on('combo-sync', this.handleSync);
    },

    buttonHandler(e) {
      e.preventDefault();
      this.toggleActive('button handler');
    },

    enterHandler(e) {
      e.preventDefault();
      if (this.isActive) {
        this.select(this.highlightedIndex);
      } else {
        this.toggleActive('enter handler');
      }
    },

    selectHandler(e) {
      this.selectFromVal(e.target.value);
    },

    swapperChangedHandler(data) {
      const self = this;
      if (data.group === self.target) {
        // console.log('swap', data);
      }
    },

    selectFromVal(str) {
      this.options.forEach((opt, index) => {
        if (opt.value === str) this.select(index);
      });
    },

    toggleActive(origin) {
      this.log(origin);
      this.isActive = !this.isActive;
      if (this.native) {
        const event = new CustomEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        this.$refs.select.dispatchEvent(event);
      }
    },

    optionClickHandler(e) {
      let el = e.target;
      if (el.nodeName !== 'LI') {
        el = el.closest('li');
      }
      this.select(el);
    },

    handleSync(data) {
      if (data.group === this.target || this.group === data.group) {
        this.options.forEach((opt, index) => {
          if (opt.value === data.value) this.select(index, false);
        });
      }
    },

    select(el, toggle = true) {
      let which = el;
      if (typeof which === 'number') {
        which = this.$refs.options.querySelectorAll('li')[which];
      }

      const obj = {
        id: this.$el.id,
        group: this.target || false,
        text: which.innerText,
        value: which.getAttribute('value'),
      };

      this.options.forEach((opt, index) => {
        if (opt.value !== obj.value) {
          this.$set(this.options[index], 'active', false);
        } else {
          this.$set(this.options[index], 'active', true);
          this.activeIndex = index;
        }
      });
      this.$bus.$emit('combo-value-changed', { origin: this, data: obj });
      this.activeText = obj.text;
      if (this.isActive && toggle) this.toggleActive('select');
    },

    processHTMLOptions(opts) {
      const data = [];
      for (let x = 0, l = opts.length; x < l; x += 1) {
        const actual = opts[x];
        const obj = {
          text: actual.innerText,
          value: actual.getAttribute('value'),
        };
        data.push(obj);
      }
      this.options = [...data];
    },

    highlightHandler(e) {
      e.preventDefault();
      let dir = 0;
      const key = e.charCode || e.keyCode;
      let which = this.activeIndex;

      switch (key) {
        case 38:
          dir = -1;
          break;
        case 40:
          dir = 1;
          break;
        default:
          dir = 0;
          break;
      }

      const { length } = this.options;
      which += dir;
      if (which >= length) which = 0;
      if (which < 0) which = length - 1;

      this.select(which, true, false);
    },
  },
};
</script>

<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
