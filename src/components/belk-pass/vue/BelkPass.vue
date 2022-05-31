<template>
  <div class="belk-pass">
    <div class="pass-tip" v-if="hasHint">
      <sh-tooltip id="pw-tip" ref="tip"></sh-tooltip>
    </div>
    <div class="pass-input">
      <input v-on:input="handleInput" ref="input" :type="inputType">
    </div>
    <button @click="toggleVisibility" class="pass-toggle">
      <i v-if="showChars" class="material-icons">
        visibility
      </i>
      <i v-else class="material-icons">
        visibility_off
      </i>
    </button>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';
import InputPrototype from '../../input-prototype';

export default {
  mixins: [ComponentPrototype, InputPrototype],

  name: 'BelkPass',

  props: {
    hint: Boolean,
  },

  data() {
    return {
      showChars: false,
      hasHint: false,
      zxc: false,
      inputType: 'password',
      tipHtml: false,
      strength: {
        0: 'Worst',
        1: 'Bad',
        2: 'Weak',
        3: 'Good',
        4: 'Strong',
      },
    };
  },

  watch: {
    tipHtml(val) {
      this.$bus.$emit('pw-tip-update', { tip: val });
    },
  },

  mounted() {
    if (window.zxcvbn && this.hint) {
      // ajax and eval is a bad idea...
      setTimeout(() => {
        this.zxc = window.zxcvbn;
      });
      this.hintSetup();
    }
  },

  methods: {
    events() {
      this.log('present');
    },

    handleInput() {
      this.value = this.$refs.input.value;
      if (this.hint) {
        if (this.value !== '') {
          const result = this.zxc(this.value);
          this.doHint();
          this.tipHtml = `Strength: ${this.strength[result.score]} <br> <meter max="4" id="password-strength-meter" value="${result.score}"></meter>`;
        } else {
          this.tipHtml = '';
          this.hideHint();
        }
      }
    },

    toggleVisibility() {
      this.showChars = !this.showChars;
      this.inputType = (this.showChars) ? 'text' : 'password';
      this.$refs.input.focus();
    },

    hintSetup() {
      this.hasHint = true;
    },

    doHint() {
      this.$bus.$emit('pw-tip-show');
    },

    hideHint() {
      this.$bus.$emit('pw-tip-hide');
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
