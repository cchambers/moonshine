<template>
  <div class="belk-pass">
    <div v-if="hint">
      <sh-tooltip id="pw-tip" ref="tip">
        <div>
          <p>Passwords are fun.</p>
          <ul>
            <li>more cahrs pls</li>
          </ul>
        </div>
      </sh-tooltip>
    </div>
    <div class="pass-input">
      <input :type="inputType">
    </div>
    <div v-hammer:tap="toggleVisibility" class="pass-toggle">
      <i v-if="showChars" class="material-icons">
        visibility
      </i>
      <i v-else class="material-icons">
        visibility_off
      </i>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';
import InputPrototype from '../../input-prototype';

export default {
  mixins: [ComponentPrototype, InputPrototype],

  name: 'BelkPass',

  props: {
    hint: false,
  },

  data() {
    return {
      showChars: false,
      showHint: false,
      zxc: false,
      inputType: 'password',
    };
  },

  mounted() {
    if (window.zxcvbn && this.hint) {
      // ajax and eval is a bad idea...
      setTimeout(() => {
        this.zxc = window.zxcvbn;
      });
    }
  },

  methods: {
    events() {
      this.log('present');
    },

    toggleVisibility() {
      this.showChars = !this.showChars;
      this.inputType = (this.showChars) ? 'text' : 'password';
      this.$refs.input.focus();
    },

    doHint() {

    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
